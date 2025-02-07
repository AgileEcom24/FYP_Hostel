using Hbms.Models;
using Hbms.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using System.Security.Cryptography;

namespace Hbms.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmailsController : ControllerBase
    {
        private readonly EmailService _emailService;
        private readonly IMemoryCache _cache;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;

        public EmailsController(EmailService emailService, IMemoryCache cache, UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        {
            _emailService = emailService;
            _cache = cache;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        private string GenerateConfirmationCode()
        {
            var bytes = new byte[4];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(bytes);
            }
            return (BitConverter.ToUInt32(bytes, 0) % 1000000).ToString("D6");
        }

        // Endpoint to send the confirmation email
        [HttpPost("send-confirmation")]
        public async Task<IActionResult> SendConfirmation([FromBody] string email)
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                return BadRequest(new { Message = "Email is required." });
            }

            // Check if the email is already registered
            var existingUser = await _userManager.FindByEmailAsync(email);
            if (existingUser != null)
            {
                return BadRequest(new { Message = "Account already registered." });
            }

            var confirmationCode = GenerateConfirmationCode();

            try
            {
                // Store the code temporarily in cache with expiration
                _cache.Set(email, confirmationCode, TimeSpan.FromMinutes(10));

                // Send the confirmation email
                await _emailService.SendConfirmationEmailAsync(email, confirmationCode);

                return Ok(new { Message = "Confirmation email sent successfully!" });
            }
            catch (Exception ex)
            {
                // Log the exception (not shown here)
                return StatusCode(500, new { Message = "An error occurred while sending the confirmation email." });
            }
        }

        // Endpoint to verify the confirmation code
        [HttpPost("verify-code")]
        public IActionResult VerifyCode([FromBody] VerificationRequest verificationRequest)
        {
            if (_cache.TryGetValue(verificationRequest.Email, out string storedCode))
            {
                if (storedCode == verificationRequest.Code)
                {
                    return Ok(new { Message = "Verification successful!" });
                }
                else
                {
                    return BadRequest(new { Message = "Invalid verification code!" });
                }
            }

            return BadRequest(new { Message = "Verification code has expired or does not exist!" });
        }

        // Endpoint to register the user with email and password
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegistrationRequest registrationRequest)
        {
            if (!_cache.TryGetValue(registrationRequest.Email, out string _))
            {
                return BadRequest(new { Message = "Email is not verified!" });
            }

            var user = new IdentityUser { UserName = registrationRequest.Email, Email = registrationRequest.Email };
            var result = await _userManager.CreateAsync(user, registrationRequest.Password);

            if (result.Succeeded)
            {
                return Ok(new { Message = "User registered successfully!" });
            }
            else
            {
                return BadRequest(new { Message = string.Join(", ", result.Errors.Select(e => e.Description)) });
            }
        }

        // Endpoint for login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginRequest loginRequest)
        {
            var result = await _signInManager.PasswordSignInAsync(loginRequest.Email, loginRequest.Password, false, false);

            if (result.Succeeded)
            {
                return Ok(new { Message = "Login successful!" });
            }

            return BadRequest(new { Message = "Invalid email or password." });
        }
    }
}
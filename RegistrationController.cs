using Hbms.Models;
using Hbms.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Hbms.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RegistrationController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly IEmailService _emailService;

        public RegistrationController(UserManager<IdentityUser> userManager,
                                      SignInManager<IdentityUser> signInManager,
                                      IEmailService emailService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _emailService = emailService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegistrationRequest request)
        {
            var user = new IdentityUser { UserName = request.Email, Email = request.Email };
            var result = await _userManager.CreateAsync(user, "Password123"); // Replace with a password you choose

            if (result.Succeeded)
            {
                var confirmationCode = new Random().Next(100000, 999999).ToString();
                _emailService.SendConfirmationEmailAsync(request.Email, confirmationCode);
                return Ok(new { Message = "Registration successful. Please verify your email." });
            }

            return BadRequest(new { Message = "Registration failed" });
        }
    }

    public interface IEmailService
    {
        void SendConfirmationEmailAsync(string email, string confirmationCode);
    }
}

using MailKit.Net.Smtp;
using MimeKit;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Hbms.Services
{
    public class EmailService
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<EmailService> _logger;

        public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        public async Task SendConfirmationEmailAsync(string recipientEmail, string confirmationCode)
        {
            try
            {
                // Create the email message
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress("Your App", _configuration["SMTP:UserName"]));
                message.To.Add(new MailboxAddress("", recipientEmail));
                message.Subject = "Email Confirmation Code";
                message.Body = new TextPart("plain")
                {
                    Text = $"Your confirmation code is: {confirmationCode}"
                };

                // Send the email using SMTP
                using var client = new SmtpClient();
                await client.ConnectAsync(
                    _configuration["SMTP:Host"],
                    int.Parse(_configuration["SMTP:Port"]),
                    MailKit.Security.SecureSocketOptions.StartTls
                );
                await client.AuthenticateAsync(_configuration["SMTP:UserName"], _configuration["SMTP:Password"]);
                await client.SendAsync(message);
                await client.DisconnectAsync(true);

                // Log success
                _logger.LogInformation($"Confirmation email sent to {recipientEmail}");
            }
            catch (Exception ex)
            {
                // Log error
                _logger.LogError($"Failed to send email to {recipientEmail}. Error: {ex.Message}");
                throw; // Re-throw the exception to handle it higher up if needed
            }
        }
    }
}

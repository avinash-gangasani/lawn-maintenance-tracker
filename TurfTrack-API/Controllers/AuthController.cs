using Microsoft.AspNetCore.Mvc;
using Google.Apis.Auth;

namespace TurfTrack.Controllers
{
    public class GoogleAuthRequest
    {
        public string Token { get; set; }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly string _googleClientId = "396703659680-skjf4hu1gsr9g91qkgi06fl6b696ndks.apps.googleusercontent.com";

        [HttpPost("google")]
        public async Task<IActionResult> GoogleLogin(GoogleAuthRequest request)
        {
            try
            {
                // Verify the token against Google's public JSON Web Keys (JWK)
                var settings = new GoogleJsonWebSignature.ValidationSettings()
                {
                    Audience = new List<string> { _googleClientId }
                };

                // This line throws an exception if the token is tampered with or expired
                var payload = await GoogleJsonWebSignature.ValidateAsync(request.Token, settings);

                // Google has verified this user! You can now access their verified details:
                string userEmail = payload.Email;
                string name = payload.Name;
                string googleUserId = payload.Subject; // Unique identifier permanent to this user

                // TODO: Look up the user in your SQL/PostgreSQL database.
                // If they don't exist, create a new user profile record.
                // Generate your own application JWT or HttpOnly authentication cookie here.

                return Ok(new { Message = "Successfully authenticated!", Email = userEmail });
            }
            catch (InvalidJwtException)
            {
                return BadRequest("Invalid or tampered Google Token.");
            }
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            // Expire the authentication cookie instantly
            Response.Cookies.Delete(".AspNetCore.Application.Id");

            // If using standard ASP.NET Core Identity/IdentityServer:
            // await _signInManager.SignOutAsync();

            return Ok(new { Message = "Logged out successfully from server" });
        }
    }
}

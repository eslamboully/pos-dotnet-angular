using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using API.Errors;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API.Middlewares
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger _logger;
        private readonly IHostEnvironment _env;

        public ExceptionMiddleware(RequestDelegate next,ILogger<ExceptionMiddleware> logger,IHostEnvironment env)
        {
            _next = next;
            _logger = logger;
            _env = env;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,ex.Message);
                var apiExceptionResponse = _env.IsDevelopment() ? new ApiException(context.Response.StatusCode,ex.StackTrace?.ToString(),ex.Message) :
                new ApiException(context.Response.StatusCode,null,"Internal Server Error");

                var apiExceptionResponseJson = JsonSerializer.Serialize(apiExceptionResponse);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;
                
                await context.Response.WriteAsync(apiExceptionResponseJson);
            }
        }
    }
}
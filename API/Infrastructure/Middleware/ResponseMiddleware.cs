using System;
using System.Threading.Tasks;
using API.Infrastructure.Helpers;
using API.Infrastructure.Responses;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Serilog;

namespace API.Infrastructure.Middleware {

    public class ResponseMiddleware : IMiddleware {

        public ResponseMiddleware() { }

        public async Task InvokeAsync(HttpContext httpContext, RequestDelegate next) {
            try {
                await next(httpContext);
            } catch (CustomException exception) {
                await CreateCustomErrorResponse(httpContext, exception);
            } catch (Exception exception) {
                LogError(exception);
                await CreateServerErrorResponse(httpContext, exception);
            }
        }

        private static Task CreateCustomErrorResponse(HttpContext httpContext, CustomException e) {
            httpContext.Response.StatusCode = e.ResponseCode;
            httpContext.Response.ContentType = "application/json";
            var result = JsonConvert.SerializeObject(new Response {
                Code = e.ResponseCode,
                Icon = Icons.Error.ToString(),
                Id = null,
                Message = GetErrorMessage(e.ResponseCode)
            });
            return httpContext.Response.WriteAsync(result);
        }

        private static Task CreateServerErrorResponse(HttpContext httpContext, Exception e) {
            httpContext.Response.StatusCode = 500;
            httpContext.Response.ContentType = "application/json";
            var result = JsonConvert.SerializeObject(new Response {
                Code = 500,
                Icon = Icons.Error.ToString(),
                Id = null,
                Message = e.Message
            });
            return httpContext.Response.WriteAsync(result);
        }

        private static string GetErrorMessage(int httpResponseCode) {
            return httpResponseCode switch {
                402 => ApiMessages.CheckInAfterDepartureIsNotAllowed(),
                404 => ApiMessages.RecordNotFound(),
                456 => ApiMessages.InvalidNationality(),
                457 => ApiMessages.InvalidGender(),
                458 => ApiMessages.InvalidOccupant(),
                498 => ApiMessages.EmailNotSent(),
                _ => ApiMessages.UnknownError(),
            };
        }

        private static void LogError(Exception exception) {
            Log.Error("MESSAGE {message}", exception.Message);
        }

    }

}
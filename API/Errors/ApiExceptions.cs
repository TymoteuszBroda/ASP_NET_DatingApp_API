using System;

namespace API.Errors;

public class ApiExceptions(int statusCode, string message, string? details)
{
    public int StatusCode { get; set; } = statusCode;
    public string message { get; set; } = message;
    public string? Details { get; set; } = details;
}

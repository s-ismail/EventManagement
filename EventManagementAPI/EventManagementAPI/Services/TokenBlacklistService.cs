namespace EventManagementAPI.Services
{
    using System;
    using System.Collections.Concurrent;

    public class TokenBlacklistService
    {
        private static ConcurrentDictionary<string, DateTime> _blacklistedTokens = new ConcurrentDictionary<string, DateTime>();

        public void BlacklistToken(string token)
        {
            if (!string.IsNullOrEmpty(token))
            {
                _blacklistedTokens.TryAdd(token, DateTime.UtcNow.AddHours(1));
            }
        }

        public bool IsTokenBlacklisted(string token)
        {
            if (string.IsNullOrEmpty(token))
            {
                return false;
            }
            return _blacklistedTokens.TryGetValue(token, out var expirationTime) && expirationTime > DateTime.UtcNow;
        }

        public void CleanupExpiredTokens()
        {
            var now = DateTime.UtcNow;
            foreach (var kvp in _blacklistedTokens)
            {
                if (kvp.Value <= now)
                {
                    _blacklistedTokens.TryRemove(kvp.Key, out _);
                }
            }
        }
    }


}

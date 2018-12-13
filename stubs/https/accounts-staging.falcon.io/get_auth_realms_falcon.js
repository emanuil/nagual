module.exports = function() {
    this.method = 'GET';
    this.url = '/auth/realms/falcon';

    this.token = {
        string: '/auth/realms/falcon',
        location: 'url'
    };

    this.getResponse = function(request) {
    	
    	var result_h = {
		  "date": "Mon, 13 Dec 2018 09:57:29 GMT",
		  "content-type": "application/json",
		  "content-length": "626",
		  "connection": "keep-alive",
		  "vary": "Accept-Encoding, Origin",
		  "cache-control": "no-cache",
		  "strict-transport-security": "max-age=15768000; includeSubDomains",
		  "x-content-type-options": "nosniff",
		  "x-xss-protection": "1; mode=block",
		  "x-frame-options": "SAMEORIGIN",
		  "referrer-policy": "strict-origin-when-cross-origin",
		  "feature-policy": "camera 'none'; microphone 'none'; geolocation 'none'; accelerometer 'none'; ambient-light-sensor 'none'; encrypted-media 'none'; gyroscope 'none'; magnetometer 'none'; midi 'none'; payment 'none'; speaker 'none'; usb 'none'; vr 'none'; picture-in-picture 'none';",
		  "access-control-expose-headers": "Access-Control-Allow-Origin",
		  "access-control-allow-origin": "https://accounts-staging.falcon.io",
		  "access-control-allow-methods": "GET, OPTIONS, POST, PUT",
		  "access-control-allow-headers": "Authorization, Content-Type, origin, x-requested-with",
		  "access-control-allow-credentials": "true",
		  "content-security-policy": "frame-ancestors https://*.falcon.io https://*.flcn.io https://*.falconsocial.com https://localhost:3000 https://localhost:3001 https://localhost:3002 https://localhost:4200;",
		  "x-falcon-request-id": "dc7797a24d61ec4c575786e04f74fd62",
		  "server-timing": "request;desc=\"Request Time\";dur=0.002;",
		  "timing-allow-origin": "SAMEORIGIN"
		};

        var result =
        {
          "realm": "falcon",
          "public_key": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArwKpUroM1twIPlM33gHJixczeL9xg/vSqb6x6atgv9OO+f83tP4XpThSN39oGwuFr/db5G1rqgBHEKIGHqQLawHXaPDp6BZ5kQHX8TMKVKUEC/mpF13f30SVr48ALKxAcpitdOsEhpX28uLgN6Hg1VBEea8P3ZQGSLzFwErKhq+w/ezyN/VsxD267jvJ1sP/VYEjzLBwbQoQGpgZYAoRQ3KTzqKvsbpCOtSpKEp76te/+c66sG9IQM56S2sxT56xv8f3MagqBRt4popM8Up+vhzLuKqguUW+8Hb7XAV/skIsSXhrBF4om0StoL9uxp7fwL8FpXAFUfiyYXoN795MkQIDAQAB",
          "token-service": "https://accounts-staging.falcon.io/auth/realms/falcon/protocol/openid-connect",
          "account-service": "https://accounts-staging.falcon.io/auth/realms/falcon/account",
          "tokens-not-before": 1
        }; 
        

        return {
        	'headers': JSON.stringify(result_h),
            'body': JSON.stringify(result)
        };
    };
};

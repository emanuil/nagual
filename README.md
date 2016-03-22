## What is this?

This is a standalone HTTP server created to simulate various responses as if they are returned by a third party web service APIs. For example, the simulator can be configured to act as api.twitter.com or graph.facebook.com without your application knowing the difference. Its primary use is for functional (manual and automated) testing. Its secondary uses are monitoring and performance/stress testing.

## Why create it?

If your application uses any external resources, you’re relying on them constantly being online and responsive so that your tests are passing 100%. If the Internet is down, or slow, your tests will fail. If the external service throttles your requests, after you reach the daily limit, your tests will fail. If you have to manually renew expired credentials, your tests will fail. Also note that some of the responses coming from external services cannot be easily triggered. These include internal server errors, timeout even sending mangled data. In short, your high level tests (everything other than unit tests) have lots of reasons of moving parts and thus reasons to fail.

This simulator was created as a way to overcome the obstacles described above. You’ll have full control over your high level tests and they will become more stable and reliable.

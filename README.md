## What is this?

This is a standalone HTTP server created to simulate various responses as if they are returned by a third party web service APIs. For example, the simulator can be configured to act as api.twitter.com or graph.facebook.com without your application knowing the difference. Its primary use is for functional (manual and automated) testing. Its secondary uses are monitoring and performance/stress testing.

## Why create it?

If your application uses any external resources, you’re relying on them constantly being online and responsive so that your tests are passing 100%. If the Internet is down, or slow, your tests will fail. If the external service throttles your requests, after you reach the daily limit, your tests will fail. If you have to manually renew expired credentials, your tests will fail. Also note that some of the responses coming from external services cannot be easily triggered. These include internal server errors, timeout even sending mangled data. In short, your high level tests (everything other than unit tests) have lots of reasons of moving parts and thus reasons to fail.

This simulator was created as a way to overcome the obstacles described above. You’ll have full control over your high level tests and they will become more stable and reliable.

## How Nagual differs from the other open source tools?

To serve our purposes we had to fulfill 9 key requirements

1. **Standalone**. The simulator must be able to run as an independent standalone service. It should not run as http proxy (think Squid proxy) because most of the applications are not designed to use a proxy to talk HTTP to the outside world.
2. **Fake SSL Certs**. All of the external web services that we want to simulate are SSL enabled. Server certificate verification is turned on in the client libraries used to communicate with them. Nagual runs as man-in-the-middle transparent proxy, not triggering any SSL verification errors.
3. **Transparent**. If a rule matches, then the response should be simulated. If not, then the request should be sent to the external service. The simulator should not require any changes to the source code of the application or the 3rd party libraries used. No internal triggers, feature flags, application file or database configurations. For purposes other than testing you should not be aware that the simulator is running.
4. **Dynamic Responses**. The simulator should be able to generate a response programmatically, on the fly. When generating responses they should be able to use random values (integer, string encodings, timestamps) and create random response structure. The simulator should be able to extract data from the request and use parts of it to construct the response.
5. **Local Storage**. The simulator should be able to locally store any generated response, so that it can later be retrieved and used for complex, multi-request sequence operations.
6. **Binary Data**. The simulator should be able to return binary data in the HTTP body - e.g. images, PDF files.
7. **Regex URL Match**. A request should be able to be flagged for simulation by regex matching.
8. **R&R Not Mandatory**. The simulator should be able to be configured without the need to record and replay requests and responses.
9. **Start Configured**For fast tests (and also to enable parallel execution of tests) the simulator should be able to start fully configured via the command line. It should allow configuration in ways other than API only.

There are various tools today that can perform HTTP simulation (some of the commercial vendors are calling it “service virtualization”). At the time of the creation of Nagual, none of the available tools supported all of the 9 key requirement. Bellow you can find a table comparing all the actively supported open source HTTP simulation tools. In case Naual does not fit your needs, try one of the listed tools.

| Tools      | Standalone | Fake SSL Certs | Transp. | Dynamic Resp. | Local Stor. | Bin. Data | Regex URL | R&R Not Mandatory | Start Conf. |
| ---------- | ---------- | -------------- | ------- | ------------- | ----------- | --------- | --------- | ----------------- | ----------- |
| Stubby4J   | yes        | yes            | no      | no            | no          | yes       | yes       | yes               | yes         |
| WireMock   | yes        | yes            | yes     | no            | no          | yes       | yes       | yes               | yes         |
| Wilma      | yes        | no             | yes     | no            | yes         | no        | no        | yes               | yes         |
| soapUI     | yes        | no             | no      | yes           | no          | yes       | no        | yes               | yes         |
| betamax    | no         | yes            | yes     | no            | no          | no        | no        | no                | yes         |
| MockServer | yes        | yes            | no      | yes           | no          | yes       | yes       | yes               | yes         |
| VCR        | no         | yes            | yes     | yes           | no          | no        | yes       | no                | yes         |
| mounteback | yes        | no             | no      | yes           | yes         | yes       | yes       | yes               | yes         |
| Hoverfly   | yes        | no             | yes     | yes           | no          | yes       | no        | yes               | yes         |
| Mirage     | yes        | no             | no      | yes           | no          | yes       | yes       | yes               | no          |

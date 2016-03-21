This is a simulator to sniff all HTTPS traffic from/to our test environment. For automation testing purposes some of
the traffic that's going to the social networks, need not reach them. Instead we need to simulate an actual response.
First we did this internally in PHP based on social network tokens or on the environment where the code is running.
However with all the 3rd party external services, this soon became unmaintainable task. This solution does not require
any code changes. It only needs to add a trusted root certificate to web-tier and the workers, and also a modification
 /etc/hosts file.

Currently the simulator for Zendesk is working, and we're in testing phase. The next simulators will be for:
  * Facebook
  * Twitter
  * LinkedIn
  * Google Plus
  * Instagram
  * YouTube
  * Rackspace CDN
  * Later, maybe some of the listening providers

Ideally no internal services should be simulated - e.g. Listening, Video Service, Tailer, API integrations, ETCD,
 logstash, statsd. Since they are under our control, they need to be real, installed on containers when the automation
 tests are running.
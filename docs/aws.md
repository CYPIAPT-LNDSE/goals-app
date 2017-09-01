# Notes on deployment

Some notes on the process of setting up our AWS Elastic Beanstalk, in case this is helpful in the future.

## Account

As generally recommended in AWS tutorials, I have created a separate user and a separate group for Grow using AWS IAM. I created and used the 'growadmin' account, but it's possible to add additional users and add them to the Grow group.

Each user needs to have credentials. These include an access key for the AWS CLI tool.


## Database

Our production database is hosted with AWS RDS. It is independent of the Elastic Beanstalk app. The credentials can be found as env vars in the configuration of the EB environment.

You can connect to this database locally using the following command:

```
psql --host={ RDS_HOSTNAME} --port=5432 --username={ RDS_USERNAME } --password --dbname=growdb
```

This will prompt you for a password.

## Elastic Beanstalk

Our app is hosted in an Elastic Beanstalk environment with a classic (elastic) load balancer.

We have just one instance of the app running on AWS EC2 but it would be possible to create more instances.

The app is being served over HTTPS.

I attempted to set up a single-instance configuration of the app, as a load balancer is arguably overkill for our needs. However, registering an SSL certificate with the single instance setup proved to be much trickier and so I reverted to the default setup with the load balancer.


## Facebook app

The app uses the same Facebook app as our Heroku instance. This means that once a user has authorised either the AWS or the Heroku app, they won't have to authorise again.


## Web sockets issues

Due to the default configuration of the load balancer, our web socket connection is failing (you can see the corresponding errors in the browser console). There are lots of suggestions as to how to fix this online, but I have been unable to get anything to work.

I also tried using a configuration without a load balancer, as well as trying the newer 'application load balancer'. But the ALB caused too many problems in itself and I was unable to deploy at all. And with the single instance setup, I got the same errors as with the ELB.

All suggestions as to how to fix this are welcome :)

In the meantime, socket.io falls back on XHR requests when web sockets are not available and so the app seems to work as expected.

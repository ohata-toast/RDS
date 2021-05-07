## Database > RDS for MySQL > Overview

NHN Cloud RDS for MySQL provides relational database in the cloud environment. 
No complicated setting is required to use highly available relational database. 

RDS for MySQL is available only when user enables Compute & Network. 

## Main Features 

* Immediately creates DB instances as wanted. 
* Conducts auto-backup of DB instances when needed. 
* Controls access of DB instances. 
* Monitors hardware and database status of DB instances, with no additional installation. By setting notifications for abnormalities, you can respond fast to an issue.

## Glossary 

### DB Instance 

* Unit of relational database provided by RDS. 
* Refers both to virtual appliance and relational database that is installed. 
* Can be created by all-type virtual appliances provided by NHN Cloud Compute & Network. 
* The DB instance supports HDD and SSD storage of 20 GB to 2 TB.
* Cannot directly access OS of a DB instance, but access to DB instance is available only via the port entered when it is created.  
* Can be created only by selecting VPC subnet of user's Compute & Network service, so as to communicate instances of user's Compute & Network service.  
* DB instance is disconnected from external networks, other than user's subnet. To enable external connection, floating IP must be associated. 
* If you're using Compute & Network, you can set a subnet to connect when a DB instance is created.   
* Network connection is enabled between DB instances and other instances in a connected subnet. 
* The Master is a general instance that can read or write. 
* The Read Only Slave instance replicates master in real time and it can read only. 
* The Candidate Master is a standby instance which is created at a different availability zone from the master, against potential failure for the use of high availability. 

### Availability Zone

* Logical area where DB instance is to be created. 

### High Availability

* High availability is ensured for the master instance.

### Floating IP 

* A floating IP to enable external communication. 
* Internet gateway must be available for user's VPC subnet which is connected with DB instance where floating IP is to be configured. 
* Database of DB instances associated with floating IP can be accessed from outside.
* Floating IP is immediately charged as soon as it is created, apart from DB instances.

### High Availability 

* With the High Availability feature, when an issue arises from instances currently in service or at an availability zone of such instances, measures are automatically taken against failure in the candidate master instance created at another availability zone. This can shorten failure duration of database to the best possible extent.
* High availability is ensured for master instances.

### Database File Encryption

* With database file encryption, files for database where user data is saved, as well as backup files, can be encrypted. 
* Safe use is guaranteed, even if database instances are stolen by a malicious user, since user data cannot be exposed.

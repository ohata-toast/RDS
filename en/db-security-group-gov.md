## Database > RDS for MySQL > DB Security Group

## DB Security Group

DB security groups are used to protect DB instances by controlling the incoming and outgoing traffic of DB instances. The positive security model is used to only allow the traffic specified by rules and block the rest. Unless you connect DB security groups to DB instances, all incoming and outgoing traffic is not allowed. Even if the DB security group is created, the rule will not apply if the DB security group is not set for the DB instance. You can apply multiple DB security groups to DB
instances. Main features of DB security group are as follows.

* Because DB security groups act as 'stateful', sessions connected once by DB security rules are allowed even if there are no rules in the opposite direction.
* For example, if the first packet on TCP 3306 destined for a DB instance is passed by the 'Incoming TCP PORT 3306' rule, packets sent from the DB instance to the TCP 3306 port are not blocked.
* However, packets in the opposite direction are also blocked when the session expires because no packets compliant with the rule are received for a certain period of time.
* Defining the scope of DB security rules is more efficient than adding them one by one. Increasing DB security rules can cause performance degradation.
* Traffic that is out of session state can be blocked.

DB security group consists of name, description, and a number of DB security rules, and DB security group name has the following restrictions.

* Must be unique for each region.
* Must consist of alphabets, numbers, - _ between 1 and 100 characters. and the first character has must be an alphabet.

### Applying DB Security Groups

When you create a DB instance, you can select the DB security group to apply. You can apply multiple DB security groups to DB instances. The rules of DB security groups already applied also apply to DB instances. You can freely change the applied DB instance on the Modify DB Instance screen.

## DB Security Rules

You can create multiple DB security rules in one DB security group. When you set up DB security groups in a DB instance, all DB security rules created in that DB security group are applied.

| Item        | Description                                                                                                                                                                                                                                                                          | 
|-------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| 
| Direction   | Inbound refers to the direction into the DB instance. Outbound means the direction out of the DB instance.                                                                                                                                                                           | 
| EtherType   | The version of EtherType IP. You can specify IPv4, IPv6.                                                                                                                                                                                                                             | 
| Port        | Set the port to which rules apply. You can enter a single port or a port range, or select the DB port. When you select the DB port, the DB port of the DB instance is automatically entered.                                                                                         | 
| Remote      | You can set the IP address range. If the direction of the rule is 'outbound', the traffic destination is remote; if 'inbound', the traffic source is remote.<br/>Depending on the direction of the rule, compares whether the traffic source or destination is IP address or range.. | 
| Description | You can add a description for DB security group rules.                                                                                                                                                                                                                               |

> [Caution]
> DB port cannot be set to transmit direction.

### Change DB Security Rules

When changes occur, such as creating, modifying, or deleting DB security rules, the changes are applied sequentially to the DB instances attached with the DB security group. You cannot add new DB security rules to DB security group or modify or delete other DB security rules until they are applied to all DB instances attached with DB security group.
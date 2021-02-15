## 数据库 > RDS for MySQL > 概要

NHN Cloud RDS for MySQ是在云环境中提供关系型数据库的服务。
无需复杂的设置过程，即可使用具有极高可用性的关系型数据库。

RDS for MySQL在激活用户的Compute & Network服务后方可使用。

## 主要功能

* 需要DB时可立即创建。
* 可在需要的时间里自动执行DB实例的备份。
* 可控制DB实例的访问。
* 无需其他安装过程，即可监控DB实例的硬件和数据库状态。如果设置为出现异常时接收警报，可快速应对问题。

## 用语说明

### DB实例

* RDS提供的关系型数据库的单位。
* DB实例是包含虚拟设备及已安装的关系型数据库的概念。
* 可利用NHN Cloud的Compute & Network服务中提供的所有类型的虚拟设备创建DB实例。
* DB实例支持最小20GB~1,000GB的HDD及SSD存储。
* 无法直接访问DB实例的OS，仅可通过创建DB时输入的端口访问数据库。
* 只有选择用户的Compute & Network服务的VPC子网才能够创建DB数据库，可以通过这种方式与用户的Compute & Network服务的实例通信。
* DB实例与用户子网以外的外部网络处于断开状态。若希望从外部连接，应连接浮动IP。
* 若正在使用Compute & Network服务，创建DB实例时，可设置希望连接的子网。
* 启用已连接的子网中的DB实例与实例之间的网络连接。
* Master是可read、write的一般性实例。
* Read Only Slave是实时复制(replication)Master的实例，仅可read。
* Candidate Master是在使用高可用性功能时为应对故障而在与Master不同的Availability Zone中创建的应对故障用实例。


### 可用区（availability zone）

* 指创建DB实例的逻辑分区。

### 浮动IP

* 用于与外部通信的流动IP。
* 互联网网关连接到与欲设置的DB实例连接的用户VPC子网时，方可使用浮动IP。
* 可从外部连接已连接到浮动IP的DB实例的数据库。
* 浮动IP创建后即与DB实例分开计费。

### 高可用性

* 若使用高可用性功能，当前使用的实例或该实例所在的Availability Zone发生问题时，在其他Availability Zone创建的Candidate Master实例自动执行故障处理。因此可最大程度缩短数据库的故障时间。
* 保障Master实例的高可用性。

### DB文件加密

* 使用DB文件加密功能，可以对保存用户数据的数据库的文件及备份文件进行加密。 
* 即使恶意用户夺取DB实例，用户数据也可安全使用，不会泄露。
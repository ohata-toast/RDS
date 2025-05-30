## Database > RDS for MariaDB > Parameter Group

## Parameter Group

To apply the settings of MariaDB installed on a DB instance, RDS for MariaDB provides the parameter group feature. A parameter group is a set of parameters for which you can set MariaDB. When the service is enabled, the default parameter group is provided for each DB engine version. The default parameter group is provided by `default.{DB Engine Version Name}` and is configured with the recommended default parameter values for each version. Default parameter group can be modified and deleted the same
as other parameter groups.

### Create Parameter Group

You can create parameter groups in the parameter console when needed. Parameter groups are created by DB engine version and can be named and there are restrictions as follows.

* Must be unique for each region.
* Must contains alphabets, numbers, and - _ between 1 and 100 characters, and the first character must be an alphabet.

When you create a parameter group, the parameter is always generated by default. To create based on an existing parameter group, you must create a parameter group using the copy parameter feature.

### Copy Parameter Group

You can create a new parameter group based on an existing parameter group. The copied new parameter group consists of the parameter values of the original parameter group. There is no association between the original parameter group and the copied parameter group, and changing or deleting the original parameter group does not have any effect on the copied parameter group.

### Reset Parameter Group

When you group parameters, you change the values of all parameters to the default values for the DB engine version.

<a id="apply"></a>
### Apply Parameter Group

When creating or modifying a DB instance, you can select the parameter groups to apply to the DB instance. One parameter group is applied to one DB instance, and one parameter group can be applied to multiple DB instances. If a parameter in a parameter group is changed, the change does not immediately apply to the DB instance. If an associated DB instance exists, the parameter group changes to `Need to Apply`. On the DB Instances list screen, select the DB instance associated with the parameter
group, and then click **Apply Parameter Group Changes** to reflect the changes in the parameters to the DB instance. When changes to the parameter group are applied to all associated DB instances, the parameter group changes to `Applied `.

> [Caution] If the parameters that require restart have changed, the DB instance will be restarted during applying changes.

### Compare Parameter Group

After selecting two different parameter groups in the console, click the **Compare** button to see what parameters are different. You can compare parameter groups for different DB engine versions as well as the same DB engine version.

### Delete Parameter Group

You are free to delete parameter groups except those already applied to the DB instances. To delete a parameter group already applied to a DB instance, you must first change the parameter group of all connected DB instances before you delete it.

## Parameter

The parameter contains the following information.

| Item             | Description                                                                                                                                                                                                       | 
|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| 
| Group            | Option group of option file (my.cnf).                                                                                                                                                                             | 
| Name             | Option name of option file (my.cnf).<br/>When the option name and system variables are different (**_- Variable_**: Displayed additionally in the format (- Variable: `System Variables`).                        | 
| Value            | Value to be applied to parameters.                                                                                                                                                                                |
| Allowed values   | Range of values applicable to parameters.<br/>                                                                                                                                                                    | 
| Application Type | Either ` Static` or ` Dynamic`.<br/>For `Static`, the DB instance must be restarted to apply the parameter changes.<br/>For `Dynamic`, the parameters are applied immediately without restarting the DB instance. | 
| Data Format      | Format of the parameter value.                                                                                                                                                                                    | |
| Use Formula      | Whether the formula is available to use.                                                                                                                                                                          |

### Parameter Variables, Formulas, and Functions

Certain parameters may be better represented by formulas using values associated with DB instances rather than using fixed values. To support this, you can use predefined variables, formulas, and functions for `NUMERIC`, `INTEGER` data format.

* Formulas
    * You can use `()`, `+`, `-`, `*`, `/`.
    * The result of a formula must always be a number.
    * If the data type is `INTEGER`, decimals are discarded.
    * If the data type is `NUMERIC`, it is rounded to the ninth decimal place.
* Functions
    * `max(a, b, ...)`: Returns the largest of several values.
    * `min(a, b, ...)`: Returns the smallest of several values.
    * `sum([a, b, ...])`: Returns the sum of multiple values.
* Variable
    * `ramSizeByte`: Indicates the byte value of the memory size of the current DB instance type.
    * `vCPU`: Indicates the number of virtual CPU cores for the current DB instance type.
    * `dbPort`: Indicates the DB port of the current DB instance.
    * `serverId`: Indicates the server ID assigned to the current DB instance.
    * `readOnly`: Indicates `1` or `0` when the current DB instance is read-only.

Below example is the default value of `innodb_buffer_pool_size` parameter, and it indicates setting to 6/10 of the memory size of the DB instance type.

``` 
ramSizeByte * 6 / 10 
```

### Change Parameter

You can change the parameters by selecting a parameter group from the console and pressing the **Edit Parameters** button. For parameters that cannot be changed, the value appears in plain text, and for parameters that can be changed, the INPUT that can be changed appears. When you press the `Preview Changes` button on the edit screen, a separate pop-up screen will be displayed to view the changed parameters, press the `Reset` button to return to the time before the change. All changes made
in edit mode are reflected in the parameter group by pressing the `Save Changes` button. For information about reflecting DB instances of changed parameter groups, refer to the [Apply Parameter Groups](parameter-group/#apply).
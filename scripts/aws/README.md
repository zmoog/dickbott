# AWS

## EC2

```
$ aws ec2 describe-instances --filters Name=tag:Project,Values=tfm Name=tag:Environment,Values=alpha Name=tag:Component,Values=actorsys
$ aws ec2 describe-instances --filters Name=tag:Project,Values=tfm Name=tag:Environment,Values=alpha 
```

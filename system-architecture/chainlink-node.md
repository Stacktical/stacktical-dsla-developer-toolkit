# Chainlink node

### Job

In the Jobs section of the Chainlink node create a new Job with the following JobSpec replating `{INITIATOR_ADDRESS}` With the right address

```text
{
    "name": "",
    "initiators": [
        {
            "params": {
                "address": "{INITIATOR_ADDRESS}"
            }
        }
    ],
    "tasks": [
        {
            "type": "dsla-protocol"
        },
        {
            "type": "copy",
            "params": {
                "copyPath": [
                    "result"
                ]
            }
        },
        {
            "type": "ethtx"
        }
    ]
}
```

### Bridge

In the bridge section create a new bridge pointing to the external adapter


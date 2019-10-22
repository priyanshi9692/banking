**input:**
```JSON
{
	
	[//]: # ( "$schema": "http://json-schema.org/draft-07/schema#", 
	"$id": "http://example.com/product.schema.json",)
	"title": "Account",
	"description": "input API for adding a banking account",
	"type": "object",
	"properties": { 
		"userId": {
			"description": "The unique identifier for a user",
			"type": "integer"
    	}, 
    	"branch_id":{
    		"description": "The unique identifier for a bank branch",
			"type": "integer"
    	}
	},
  	"required": [ "userId", "branch_id" ]
}
```

**Successful Output:**
```JSON
{
	<!--"$schema": "http://json-schema.org/draft-07/schema#",
	"$id": "http://example.com/product.schema.json", -->
	"title": "Account",
	"description": "output API for adding a banking account",
	"type": "object",
	"properties": {
		"userId": {
			"description": "The unique identifier for a user",
			"type": "integer"
    	},
    	"type":{
      		"description": "Product code",
			"type": "string"
    	},
    	"balance":{
    		"type":"object",
    		"properties": {
        		"currency": {
          			"type": "string"
        		},
        		"amount": {
          			"type": "number"
        		}
      		},
      		"required": [ "currency", "amount" ]
    	},
    	"branch_id":{
    		"description": "The unique identifier for a bank branch",
			"type": "integer"
    	},
    	"account_routing":{
    		"type":"object",
    		"properties": {
    			"scheme": {
          			"type": "string",
          			"description":"e.g AccountNumber"
        		},
        		"address": {
          			"type": "number"
          		}
    		},
    		"required": [ "scheme", "address" ]
    	},
    	"account_attributes": {
      		"description": "Tags for the product",
      		"type": "array",
      		"items": {
        		"type": "object"
        		"properties": {
        			"account_type": {
          				"type": "string"
        			},
        			"account_id": {
          				"type": "string"
        			},
        			"name": {
          				"type": "string"
        			},
        			"open_date": {
          				"type": "string"
        			}
        		}
        		<!--},
        		"required": [ "account_type", "account_id","name","open_date" ] -->
      		},
      		"minItems": 1,
      		"uniqueItems": true
  		}
  	},
  	<!--"required": [ "productId", "productName", "price" ] -->
}
```

**Error Handling:**
```JSON
{
	
	[//]: # ( "$schema": "http://json-schema.org/draft-07/schema#", 
	"$id": "http://example.com/product.schema.json",)
	"title": "Account",
	"description": "error handling for adding a banking account",
	"type": "object",
	"properties": {  	
  		"error_code":{
  			"type": "string"
  		}
  		"error_desc":{
  			"type": "string"
  		}
  	} 
}
```    	
**Possible Errors:**
+ AA-10001: Invalid json format.
+ AA-20001: User not found.
+ AA-30001: Bank not found.
+ AA-50000: Unknown Error.     	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
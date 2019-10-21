```JSON
input

(TBD)

Error Handling:
{
	@*"$schema": "http://json-schema.org/draft-07/schema#",
	"$id": "http://example.com/product.schema.json",**@
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


Successful Output:
{
	@*"$schema": "http://json-schema.org/draft-07/schema#",
	"$id": "http://example.com/product.schema.json",*@
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
        			"product_code": {
          				"type": "string"
        			},
        			"account_attribute_id": {
          				"type": "string"
        			},
        			"name": {
          				"type": "string"
        			},
        			"type": {
          				"type": "string"
        			},
        			"value": {
          				"type": "string"
        			}
        		}
        		@*},
        		"required": [ "product_code", "account_attribute_id","name","type","value" ]*@
      		},
      		"minItems": 1,
      		"uniqueItems": true
  		}
  	},
  	"required": [ "productId", "productName", "price" ]
}
```    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
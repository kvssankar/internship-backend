# internship-backed

## Tech used:
1. Nodejs 
2. Express
3. PG
4. AWS
5. Docker

## Points to be noted:
1. Made the search case-insensitive 
2. Added paging feature
3. Deployed in Heroku, AWS using docker
4. Partial match doesn't contain full matched strings

## Response object
    {"Complete match":[....],"Partial match":[....]} 

## How to use?
1. Normal search
     https://kvssankar-internship-backend.herokuapp.com/?search=pinterest%20account

2. With page and pageSize(default 20 if page is mentioned or else full size)
    https://kvssankar-internship-backend.herokuapp.com/?search=pinterest%20account&page=2&pageSize=3

## AWS
*checkout aws branch for docker files*

> Note: No SSL certificate so please use http

1. Normal search
    http://ec2-65-0-68-209.ap-south-1.compute.amazonaws.com/?search=account%20pinterest

2. With page and pageSize(default 20 if page is mentioned or else full size)
    http://ec2-65-0-68-209.ap-south-1.compute.amazonaws.com/?search=account%20pinterest&page=4&pageSize=1
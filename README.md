# 🎁 FlutterBox - Blind Box E-commerce Store

Welcome to **FlutterBox**, an e-commerce web app where customers can buy surprise blind boxes filled with cute figurines!


## 🚀 Features

User Authentication
- Registration
    - New clients can make accounts
- AuthProvider
    - Utilizes useContext hook to pass auth state to prevent prop drilling
- Forgot Password
    - If users forget, they are able to reset their password by giving their email. FlutterBox will then send out an email for users to change their password! 
- Role-Based Access
    - Invalid URLs will automatically redirect user to catalogue page
    - This function helps prevent unauthorized level of access
    
- Product Catalogue - Vendor/Client
    - Vendor & Client Functionalities
        - Both are able to view the products published by the vendor
    - Vendor-specific
        - Vendors are able to add items to the catalogue

- Product Pages - Vendor/Client
    - Vendor-specific
        - Vendors can view & edit the fields of a specific product 
    - Client-specific
        - Clients can view the fields of a specific product

- Profile Pages - Vendor/Client
    - Vendor & Client Functionalities
        - Provides User name and email
        - Handles Logout
    - Client-specific
        - Cart Stats -- Displays the number of items currently in the Client's Cart 

- Client Cart & Confirmation
    - Lists the Items in the Client's Cart
        - Provides the Item's name and image
    - Cart provides total price at the bottom
    - Users may remove items from their cart by clicking the 'X' button
    - Successfully checking out guides clients to a confirmation page, which links users back to product catalogue

## Reflection

- Challenges
    - Merge Conflicts
        - Since we usually worked alone, we never had to deal with merge conflicts before. Throughout this project, we had to learn how to create branches, merge them, and handle any conflicting sections of code. 
    - Conflicting Schedules
        - With midterms and finals season approaching, we had to learn how to balance academics and work. 

- Lessons Learned
    - The Importance of Communication
        - We realized that we needed to communicate our issues and amount of progress made no matter how minor, or else we'd risk of two people doing the same task or realizing that something hadn't been implemented yet

    - Planning out the Types/Interfaces FIRST
        - We could've saved time by mapping out the different interfaces we would use at the very beginning, rather than going back and making edits later. 

- Overall Thoughts
    - Our team learned a great deal from this experience, both technical and personal aspects. While we were only given 2 weeks, we were able to accomplish so much. We hope you admire this product as much as we do. 

    

## 🛠️ Running the App

```bash
npm install
npm run dev
```

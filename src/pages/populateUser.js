const Users = [
    
    {
        email: "jon@gmail.com",
        password: "GrapeFruit",
        firstName: "jon", 
        lastName:"martinez",
        phoneNumber: "287-656-5643",
        creds: "u", 
    }, 
    {
        email: "locnguyen@gmail.com",
        password: "GrapeFruit",
        firstName: "loc", 
        lastName:"nguyen",
        phoneNumber: "287-656-5643",
        creds: "u", 
    },   
    {
        email: "williamburroughs@gmail.com",
        password: "password",
        firstName: "william", 
        lastName:"burroughs",
        phoneNumber: "287-656-5643",
        creds: "u", 
    },   
    {
        email: "emilioibarra@gmail.com",
        password: "password",
        firstName: "emilio", 
        lastName:"ibarra",
        phoneNumber: "232--665-6780",
        creds: "u", 
    },   
    {
        email: "mariavanesa@gmail.com",
        password: "wintermelon",
        firstName: "mariavanesa", 
        lastName:"rivera",
        phoneNumber: "324-245-9978",
        creds: "u", 
    },
        {
        
        email: "alexanderprice4948@gmail.com",
        password: "WinterMelon",
        firstName: "alexander", 
        lastName:"price",
        phoneNumber: "251-334-4668",
        creds: "u", 
    },
    {
        email: "elijahchappell9091@gmail.com",
        password: "HoneyLemon",
        firstName: "elijah", 
        lastName:"chappell",
        phoneNumber: "210-939-4344",
        creds: "u", 
    },
    {
        email: "lilylopez8094@gmail.com",
        password: "StrawberryLemon",
        firstName: "lily", 
        lastName:"lopez",
        phoneNumber: "231-988-6453",
        creds: "u", 
    },   
         
    ]
    
    Users.map((user) => {
        Axios.post("http://localhost:3001/login/create", user);
    })
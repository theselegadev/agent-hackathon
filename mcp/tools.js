class Tools{
    constructor(){
        this.endpoint = "http://localhost:8081/sale"
    }

    static async saveSale({idBusiness,type,product,value,client,date}){
        const response = await fetch(this.endpoint,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({idBusiness,type,product,value,client,date})
        });
        
        return await response.json();
    }
}
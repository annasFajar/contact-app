const rf = require("node:fs");


const dataDir = './data';
const fileDir = './data/contacts.json';
const  fileSync = ()=>{
    if(!rf.existsSync(dataDir)) {
        rf.mkdirSync(dataDir);
    };
    
    if(!rf.existsSync(fileDir)) {
        rf.writeFileSync(fileDir, '[]', "utf-8");
    }
}

const fileBaca = () => {
    const file2 = rf.readFileSync(fileDir,"utf-8");
    const fileJson = JSON.parse(file2)
    return fileJson
}


const details = (info) => {
    const contacts = fileBaca()
    const kontak = contacts.find(contact => {
        if (contact.nama === info) {
            return  contact
        }
    })
    return kontak
}

module.exports = { fileSync, fileBaca, details }
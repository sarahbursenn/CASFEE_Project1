export class NotesRestService{

    async createNote(note){
        return await this.ajax('POST', '/notes', note);
    }

    async updateNote(note){
        return await this.ajax('PUT', `/notes/${note._id}`, note);
    }

    async getNote(id){
        return await this.ajax('GET', `/notes/${id}`, undefined);

    }

    async getAllNotes(){
        return await this.ajax('GET', '/notes/', undefined);
    }

    ajax(method, url, data, headers) {
        const fetchHeaders = new Headers({'content-type': 'application/json', ...(headers || {})});

        return fetch(url, {
            method: method,
            headers: fetchHeaders, body: JSON.stringify(data)
        }).then(x => {
            return x.json();
        });
    }
}
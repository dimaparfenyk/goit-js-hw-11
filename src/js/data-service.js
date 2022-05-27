export default class NewsApiService{
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    };

    fetchImages() {
        // const BASE_URL = `https://pixabay.com/api/`;
        // const authorizeKey = `27652237-fecfle648e251b2f1d2bb2568`;
       
        
    return fetch(`https://pixabay.com/api/?key=27652237-fecf1e648e251b2f1d2bb2568&q=${this.searchQuery}&per_page=5&page=${this.page}&image_type=photo&orientation=horizontal&safesearch=true`)
        .then(res => res.json())
        .then(data => {
            this.incrementPage();
            return data.hits;
            });
    
    };

    incrementPage() {
        this.page += 1;  
    };

    resetPage() {
        this.page = 1;
    };

      get query(){
            return this.searchQuery;
    };

        set query (newQuery){
            this.searchQuery = newQuery;
    };
};
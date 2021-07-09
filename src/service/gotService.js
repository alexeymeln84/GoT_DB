

export default class GotService {
    constructor() {

        this.found = '';
        this._mainSource = 'https://www.anapioficeandfire.com/api';
        this._setData = (data) => {
            return data !== '' ? data : '-- no result --'
        };
        this._getId = (data) => {
            const idRegExp = /\/([0-9]*)$/;
            return data.url.match(idRegExp)[1];
        };
        this._getSource = async (url) => {
            const result = await fetch(url);
            if (!result.ok) {
                throw Error(`Could not fetch ${url}, status: ${result.status}`)
            }
            return await result.json()
        }
        this._parseDate = (date) => {
            const dateRegExp = /\d{4}(-|\/)\d{2}(-|\/)\d{2}/;
            return date.match(dateRegExp)[0];
        }

        this._getFound = async (data) => {
            if(!data.founder) {return '-- no result --';}  
            await this.getCharacter(this._getId(data)).then(res => {
                this.found = res.Name
            });
            return this.found;
        }
        this._getOverlord = async (data) => {
            if(!data.overlord) {return '-- no result --'}
            await this.getCharacter(this._getId(data)).then(res => {
                this.found = res.Name
            });
            return this.found;
        }
        this._transformCharData = (data) => {
            return {
                'id': this._getId(data),
                'Category': 'Char',
                'Name': this._setData(data.name),
                'Gender': this._setData(data.gender),
                'Born': this._setData(data.born),
                'Died': this._setData(data.died),
                'Culture': this._setData(data.culture)
            }
        };

        this._transformBookData = (data) => {
            return {
                'id': this._getId(data),
                'Category': 'Book',
                'Name': this._setData(data.name),
                'Authors':this._setData(data.authors),
                'Number of pages': this._setData(data.numberOfPages),
                'Publisher': this._setData(data.publisher),
                'Released': this._setData(this._parseDate(data.released))
            }
        };

        this._transformHouseData = async (data) => {
            return {
                'id': this._getId(data),
                'Category': 'House',
                'Name': this._setData(data.name),
                'Region': this._setData(data.region),
                'Founded': this._setData(data.founded),
                'Founder': await this._setData(this._getFound(data)),
                'Overlord': await this._setData(this._getOverlord(data))
            }
        }
    }

    getHouse = async (id) => {
        const result = await this._getSource(`${this._mainSource}/houses/${id}`);
        return this._transformHouseData(result);
    }

    getAllHouses = async () => {
        const result = await this._getSource(`${this._mainSource}/houses?page=3&pageSize=10`);
        return result.map(this._transformCharData);
    }

    getCharacter = async (id) => {
        const result = await this._getSource(`${this._mainSource}/characters/${id}`);
        return this._transformCharData(result);
    }

    getAllCharacters = async () => {
        const result = await this._getSource(`${this._mainSource}/characters?page=15&pageSize=10`);
        return result.map(this._transformCharData);
    }

    getBook = async (id) => {
        const result = await this._getSource(`${this._mainSource}/books/${id}`);
        return this._transformBookData(result);
    }

    getAllBooks = async () => {
        const result = await this._getSource(`${this._mainSource}/books?page=1&pageSize=10`);
        return result.map(this._transformBookData);
    }
    
}


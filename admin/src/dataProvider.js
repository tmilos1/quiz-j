import { fetchUtils } from 'react-admin'
import { stringify } from 'query-string'


let apiUrl = process.env.REACT_APP_API_URL
// apiUrl = apiUrl.substring(1, apiUrl.length - 1)

const httpClient = fetchUtils.fetchJson

const getOptions = () => {
    const options = {}
    options.headers = new Headers({ Accept: 'application/json' });
    // options.headers.set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))

    options.headers.set('instructorId', localStorage.getItem('instructorId'))
    return options
}

const decorateOneWithId = (data) => {
    if (!data || !data._id) {
        return {}
    }

    return {
        id: data._id,
        ...data,
    }
}

const decorateArrayWithId = (data) => {
    if (!data) {
        return []
    }
    return data.map(row => decorateOneWithId(row))
}

export default {
    getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        }
        const url = `${apiUrl}/${resource}?${stringify(query)}`

        return httpClient(url, getOptions()).then(({ headers, json }) => {
            return {
                data: decorateArrayWithId(json),
                total: parseInt(headers.get('Content-Range').split('/').pop(), 10),
            }
        })
    },

    getOne: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, getOptions()).then(({ json }) => ({
            data: decorateOneWithId(json),
        })),

    getMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        }
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url, getOptions()).then(({ json }) => ({ data: decorateArrayWithId(json) }));
    },

    getManyReference: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        }
        const url = `${apiUrl}/${resource}?${stringify(query)}`

        return httpClient(url, getOptions()).then(({ headers, json }) => ({
            headers: getOptions().headers,
            data: decorateArrayWithId(json),
            total: parseInt(headers.get('content-range').split('/').pop(), 10),
        }))
    },

    update: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            headers: getOptions().headers,
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: decorateOneWithId(json) })),

    updateMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'PUT',
            headers: getOptions().headers,
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: decorateArrayWithId(json) }))
    },

    create: (resource, params) =>
        httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            headers: getOptions().headers,
            body: JSON.stringify(params.data),
        }).then(({ json }) => {
            if (resource === 'quizzes') {
                localStorage.setItem('instructorId', json.instructorId)
            }

            return {
                data: decorateOneWithId(json._doc)
            }
        }),

    delete: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
            headers: getOptions().headers,
        }).then(() => ({ data: {} })),

    deleteMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        }

        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'DELETE',
            headers: getOptions().headers,
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: decorateArrayWithId(json) }))
    },

    patch: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}/${params.field}`, {
            method: 'PATCH',
            headers: getOptions().headers,
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: decorateOneWithId(json) })),

}

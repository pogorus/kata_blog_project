export default class ApiService {
  baseURL = 'https://blog.kata.academy/api';

  async getArticles() {
    const res = await fetch(`${this.baseURL}/articles?limit=5`);
    if (!res.ok) {
      const message = `An error has occured: ${res.status}`;
      throw new Error(message);
    }
    return await res.json();
  }

  async getArticle(slug, token) {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    };
    const res = await fetch(`${this.baseURL}/articles/${slug}`, options);
    if (!res.ok) {
      const message = `An error has occured: ${res.status}`;
      throw new Error(message);
    }
    return await res.json();
  }

  async getPage(page, token) {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    };
    const res = await fetch(`${this.baseURL}/articles?limit=5&offset=${(page - 1) * 5}`, options);
    if (!res.ok) {
      const message = `An error has occured: ${res.status}`;
      throw new Error(message);
    }
    return await res.json();
  }

  async createUser(userData) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    };

    const res = await fetch(`${this.baseURL}/users`, options);
    return await res.json();
  }

  async updateUser(token, userData) {
    const options = {
      method: 'PUT',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    };

    const res = await fetch(`${this.baseURL}/user`, options);
    return await res.json();
  }

  async createArticle(token, articleData) {
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(articleData),
    };

    const res = await fetch(`${this.baseURL}/articles`, options);
    return await res.json();
  }

  async updateArticle(slug, token, articleData) {
    const options = {
      method: 'PUT',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(articleData),
    };

    const res = await fetch(`${this.baseURL}/articles/${slug}`, options);
    return await res.json();
  }

  async deleteArticle(slug, token) {
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    console.log(options);

    const res = await fetch(`${this.baseURL}/articles/${slug}`, options);
    if (!res.ok) {
      const message = `An error has occured: ${res.status}`;
      throw new Error(message);
    }
  }

  async likeArticle(slug, token) {
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    const res = await fetch(`${this.baseURL}/articles/${slug}/favorite`, options);
    return await res.json();
  }

  async dislikeArticle(slug, token) {
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    const res = await fetch(`${this.baseURL}/articles/${slug}/favorite`, options);
    return await res.json();
  }

  async login(userData) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    };

    const res = await fetch(`${this.baseURL}/users/login`, options);
    return await res.json();
  }
}

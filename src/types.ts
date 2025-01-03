interface UserGeolocation {
    lat: string;
    lng: string;
}

interface UserAddress {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: UserGeolocation;
}

interface UserCompany {
    name: string;
    catchPhrase: string;
    bs: string;
}

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: UserAddress;
    phone: string;
    website: string;
    company: UserCompany;
}

interface UserObject {
    id: number;
    name: string;
    website: string;
    email: string;
}

export { User, UserObject };
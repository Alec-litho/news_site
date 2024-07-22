

interface Currencies {
    code: string;
    value: number|string
}

interface HomeServerSideProps {
    currencies: string
    userInfo: Iauth
}
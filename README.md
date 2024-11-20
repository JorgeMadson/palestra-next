# Next-Palestra

Projeto feito para explicar um pouco como funciona algumas funcionalidades do Next.js e o seu middleware

[Palestra no google docs](https://docs.google.com/presentation/d/1pmGMmzPeQxMpt7m1QQGKlyBktvChiMgzw5dBoxgdSKk/edit?usp=sharing
).

## Estrutura
```
├───public (arquivos que vão ser servidos no /)
└───src
    ├───app (a partir daqui funciona o roteamento automático)
    │   ├───api
    │   │   ├───images
    │   │   │   └───upload (endpoint para o upload de imagens no blob da vercel)
    │   │   └───products (endpoint para salvar os produtos no banco de dados)
    │   ├───autenticar (página que set o cookie de autorização)
    │   ├───chat (funcionalidade não terminada protegida pela feature flag do middleware)
    │   ├───criar-produto (tela de criação de produto)
    │   ├───criar-produto-b (teste A/B da tela de produto)
    │   ├───fonts (fonte de tipografia )
    │   └───produtos (conecta no banco e lista todos os produtos)
    └───components (componente do formulário de produto)
```

## Instale
```bash
npm i
```

## Rodar

```bash
npm run dev
```
Abra o site [http://localhost:3000](http://localhost:3000).

## Envs
Você vai precisar das variaveis de ambiente para o feature flag e a conexão com o banco de dados e o blob
```
mv template.env .env
```


## Documentação Next.js

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
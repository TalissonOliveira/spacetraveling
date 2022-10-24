<h1 align="center">
  <img width="280px" src="https://ik.imagekit.io/imagens/SpaceTraveling/logo.svg" alt="Logo SpaceTraveling" />
</h1>

<p align="center">
<img alt="GitHub language count" src="https://img.shields.io/github/languages/count/TalissonOliveira/spacetraveling?style=flat-square">

<img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/TalissonOliveira/spacetraveling?style=flat-square">

<img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/TalissonOliveira/spacetraveling?style=flat-square">
</p>

<p align="center">
    <a href="#book-sobre-o-desafio">Sobre o desafio</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#rocket-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#test_tube-testes">Testes</a>
</p

<p align="center">
    <img alt="Preview" src="https://ik.imagekit.io/imagens/SpaceTraveling/spacetraveling-preview_cV5bRyBkZ.gif">
</p>


# :book: Sobre o desafio

**Desafio 05** da trilha de ReactJS do [Ignite](https://rocketseat.com.br/ignite) proposto pela [Rocketseat](https://www.rocketseat.com.br/) para treinar os conhecimentos adquiridos no **Chapter III**.
No desafio, foi desenvolvido um blog do zero utilizando o framework Next.js, com os conceitos de Static Site Generation (SSG), e o Prismic CMS para adicionar novos posts e fazer o gerenciamento do conteúdo das postagens.

#### Features implementadas no desafio:
- Cálculo de tempo estimado de leitura do post;
- Geração de páginas estáticas com os métodos `getStaticProps` e `getStaticPaths`;
- Formatação de datas com `date-fns`;
- Uso de ícones com `react-icons`;
- Requisições HTTP com `fetch`;
- Entre outros.

#### Features complementares:
- Comentários com Utteranc;
- Navegação entre post anterior e próximo;
- Informação de edição do post.


## :rocket: Tecnologias
Neste desafio pratiquei as seguintes tecnologias:

- [ReactJS](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [Prismic CMS](https://prismic.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [react-icons](https://react-icons.github.io/react-icons/)
- [date-fns](https://date-fns.org/)
- [Sass](https://sass-lang.com/)
- [utterances](https://utteranc.es/)

# :test_tube: Testes

### Header
- [x] should be able to render logo
### Home
- [x] should be able to return prismic posts documents using getStaticProps
- [x] should be able to render posts documents info
- [x] should be able to navigate to post page after a click
- [x] should be able to load more posts if available
- [x] should not be able to load more posts if not available
### Post
- [x] should be able to return prismic posts documents paths using getStaticPaths
- [x] should be able to return prismic post document using getStaticProps
- [x] should be able to render post document info
- [x] should be able to render loading message if fallback


---

Feito com :heart: por Talisson Oliveira

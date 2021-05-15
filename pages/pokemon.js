import React from "react";
import Link from "next/link";
import Layout from "../components/layout";
const Pokemon = ({ pokeman }) => {
  return (
    <Layout title={pokeman.name}>
      <h1 className="text-4xl mb-2 text-center capitalize">{pokeman.name}</h1>
      <img className="mx-auto" src={pokeman.image} alt={pokeman.name} />
      <p>
        <span className="font-bold mr-2">Weight: </span>
        {pokeman.weight}
      </p>
      <p>
        <span className="font-bold mr-2">Height: </span>
        {pokeman.height}
      </p>
      <h2 className="text-2xl mt-6 mb-2">Types</h2>
      {pokeman.types.map((type, key) => (
        <p key={key}>{type.type.name}</p>
      ))}
      <p className="mt-10 text-center">
        <Link href="/">
          <a className="text-2xl underline">Home</a>
        </Link>
      </p>
    </Layout>
  );
};

export default Pokemon;

// this function tells next: this page is server side rendering page
export async function getServerSideProps({ query }) {
  const id = query.id;
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokeman = await res.json();
    const paddedId = ("00" + id).slice(-3);
    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
    pokeman.image = image;

    return {
      props: { pokeman },
    };
  } catch (error) {
    console.error(error);
  }
}

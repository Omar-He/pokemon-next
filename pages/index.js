import Layout from "../components/layout";
import React, { useState } from "react";
import { PokeItem } from "../components/pokeItem";

export default function Home({ pokemon }) {
  const [isOpen, setIsOpen] = useState(false);
  const [clickedPokeman, setClickedPokeman] = useState();

  const onClickPokeman = (key) => {
    if (isOpen) {
      setIsOpen((open) => !open);
      setClickedPokeman(1000);
      return;
    }
    setIsOpen((open) => !open);
    setClickedPokeman(key);
  };

  return (
    <Layout title="NextJS Pokemon">
      <h1 className="text-4xl mb-8 text-center">NextJS Pokemon</h1>
      <ul className="flex p-2 h-96 bg-white rounded-sm overflow-x-auto overflow-y-hidden rounded-md shadow-xl">
        {pokemon.map((pokeman, key) => {
          const accordionStyle = isOpen ? "block w-96 p-4" : "hidden w-0 p-0";
          const pokeCard = "flex flex-col w-44 rounded-r-none";

          return (
            <li
              key={key}
              className="flex w-lg h-full px-3 py-2 select-none text-white "
            >
              <div
                className={`${
                  clickedPokeman == key ? pokeCard : "w-60"
                } hover:bg-yellow-200 transition-all duration-500 ease-linear relative h-full  flex justify-center items-center bg-blue-200 shadow-lg rounded-xl`}
                onClick={() => onClickPokeman(key)}
              >
                <img
                  className={`${
                    clickedPokeman == key
                      ? "object-contain rounded-l-xl"
                      : "object-contain rounded-xl"
                  } h-full w-full cursor-pointer`}
                  src={pokeman.image}
                  alt={pokeman.name}
                />
                <span
                  className={`${
                    clickedPokeman == key ? "rounded-br-none" : ""
                  } block absolute bg-black px-6 py-3 w-full bottom-0 opacity-60 rounded-b-xl capitalize`}
                >
                  {pokeman.id}. {pokeman.name}
                </span>
              </div>
              <PokeItem
                pokeData={pokeman}
                className={clickedPokeman === key ? accordionStyle : "w-0"}
              />
            </li>
          );
        })}
      </ul>
    </Layout>
  );
}

// this function tells next: this page is fully static and will grab the data from the api and pass them to the index page
export async function getStaticProps(context) {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
    const { results } = await res.json();
    const pokemon = results.map((pokeman, index) => {
      const paddedId = ("00" + (index + 1)).slice(-3);

      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
      return { ...pokeman, image, id: index + 1 };
    });
    return {
      props: { pokemon },
    };
  } catch (err) {
    console.error(err);
  }
}

import React, { useState, useEffect } from "react";
// import cn from 'classnames';
// import { Modal } from '@components/modal';
import Link from "next/link";

export const PokeItem = ({ className, pokeData }) => {
  const [openModal, setOpenModal] = useState(false);
  const [charInfo, setCharInfo] = useState();
  const [pokeInfo, setPokeInfo] = useState();

  async function getPokemonData(id) {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const pokeman = await res.json();
      setPokeInfo(pokeman);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    // if(pokeData){
    //     getPokemonData(pokeData.id)
    // }
  }, []);

  const onClickChar = (e, i, key) => {
    setOpenModal(true);
    setCharInfo(i);
    e.stopPropagation();
  };

  return (
    <div
      className={
        className +
        "  bg-gray-700 rounded-r-xl transition-all duration-300 ease-linear overflow-y-auto"
      }
    >
      {pokeData && (
        <span className="block text-lg font-bold text-yellow-500 capitalize">
          Name: {pokeData.name}
        </span>
      )}
      {pokeInfo && (
        <>
          <span className="block block text-lg font-bold text-green-300">
            Height: {pokeInfo.height}
          </span>

          <div className="mt-4">
            <span className="block text-lg font-bold text-red-300">Types:</span>
            <div className="block">
              {pokeInfo.types.map((i, k) => {
                return (
                  <span
                    className=" inline-block cursor-pointer m-1 hover:bg-red-400 p-1 rounded-md capitalize"
                    onClick={(e) => onClickChar(e, i, k)}
                    key={k}
                  >
                    {i.type.name}
                  </span>
                );
              })}
            </div>
          </div>
        </>
      )}
      <Link href={`/pokemon?id=${pokeData.id}`}>
        <a target="_blank">
          <span className="block mt-4 text-red-200 cursor-pointer">
            More details...
          </span>
        </a>
      </Link>
      {/* <Modal
                onClose={() => {
                    setOpenModal(false);
                }}
                open={openModal}
                content={charInfo}
            /> */}
    </div>
  );
};

import React,{useEffect, useState} from 'react';
import Tmdb from './Tmdb';
import './App.css';

import MovieRow from './components/MovieRow/MovieRow';
import FeaturedMovie from './components/Featured/FeaturedMovie';
import Header from './components/Header/Header';


export default () => {


  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() =>{
    const loadAll = async () =>{
      let list = await Tmdb.getHomeList();     //pegando a lista de filmes
      setMovieList(list);

      //pegando filme em destaque
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id,'tv');
      setFaturedData(chosenInfo);
    }

    loadAll();
  },  []);


  useEffect(()=>{
    const scrollListener = () =>{
      if(window.scrollY > 10 ){
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll',scrollListener);

    return() =>{
      window.removeEventListener('scroll',scrollListener);
    }

  },[]);
  
  return(
    <div className="page">
      <Header black={blackHeader}/>
      {featuredData &&
        <FeaturedMovie item={featuredData}/>
      }

      <section className="lists">
        {
        movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))
        }
      </section>
      <footer>
         Criado por<span role="img" aria-label="heart"> 🦊 Lucas Oliveira</span><br/>
         Direitos de imagem para Netflix<br/>
         Dados pegos do site <a href="https://www.themoviedb.org/?language=pt-BR">Themoviedb.org</a>

      </footer>

        {movieList.length <= 0 &&
          <div className="loading">
            <img src="https://cdn.lowgif.com/small/0534e2a412eeb281-the-counterintuitive-tech-behind-netflix-s-worldwide.gif" alt="Carregando"/>
          </div>
        }
      
    </div>
  );
}
import React from 'react';
import './Header.css';


export default ({black}) => {
    return(
        <header className={black? 'black' : ''}>
            
           <div className="header--logo">
               <a href="/">
                   <img src="https://upload.wikimedia.org/wikipedia/commons/0/0c/Netflix_2014_logo.svg" alt="Netflix"/>
               </a>
           </div>
           <div className="header--user">
                <a href="/">
                    <img src="https://zh.rbsdirect.com.br/imagesrc/21489394.jpg?w=700" alt="Usuário"/>
                </a>
           </div>
        </header>
    );
}
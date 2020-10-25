import React from "react";
import * as S from "./Home-Style.js";
import Header from '../../components/Header/Header.jsx';
import {Link} from 'react-router-dom';

const Home = () => {
  return (
    <>
    {//<Header />
    }
    <S.Content>
      <S.HeroText>
        It shouldn't take a <br />rocket scientist <br /> to use DeFi.
      </S.HeroText>
      <img src="scientist-2.svg"
            alt="scientist working on computer"
            height={"500px"}
            width={"1000px"}
            />
    </S.Content>
    <S.Content style={{flexDirection: 'row', justifyContent: 'center'}}>
      <S.HeroText style={{margin: 0}}>
        Compose a call stack of <br /> arbitrary function calls. <br /> From <span style={{fontStyle: 'italic'}}>any</span> contract on Ethereum.
      </S.HeroText>
      <img src="stack-1.svg"
            alt="stack of colorful items"
            height={"600px"}
            width={"400px"} />
    </S.Content>
    <S.Content style={{flexDirection: 'row', justifyContent: 'center'}}>
    <img src="blockchain.svg"
            alt="stack of colorful items"
            height={"600px"}
            width={"400px"} />
    <div style={{display: 'flex', flexDirection: 'column'}}>

      <S.HeroText style={{margin: 0}}>
        The Blockchain is yours <br />to play with. <br /> Start composing.
      </S.HeroText>
      <Link to="/builder">
      <S.CoolButton>
        Build
      </S.CoolButton>
      </Link>
    </div>
    </S.Content>
    <S.Footer>
      <S.FooterRow>
        <S.FooterItem>
          GitHub
        </S.FooterItem>
        <S.FooterItem>
          Twitter
        </S.FooterItem>
        <S.FooterItem>
          Instagram
        </S.FooterItem>
      </S.FooterRow>
      <S.FooterRow>
        <S.FooterItem>
          Legal
        </S.FooterItem>
        <S.FooterItem>
          Contact
        </S.FooterItem>
        <S.FooterItem>
          Blog
        </S.FooterItem>
      </S.FooterRow>
    </S.Footer>
    </>
  );
};

export default Home;

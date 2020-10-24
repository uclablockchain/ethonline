import styled from "styled-components";

export const Header = styled.header`
  position: fixed;
  display: flex;
  flex-direction: row;
  padding: 20px 0;
  align-items: center;
  width: 100%;
  background-color: #35aaf9;
`;

export const CardDetails = styled.div`
  margin-left: 15px;
  font-family: "Cousine";
  color: white;
  font-size: 40px;
  padding: 0 30px;
`;

export const HeroText = styled.h1`
  font-family: "Cousine";
  color: #35aaf9;
  margin-right: 20%;
  font-size: 3rem;
`;

export const Content = styled.section`
  display: flex;
  margin-top: 50px;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15rem;
`;

export const Footer = styled.footer`
  bottom: 0;
  height: 200px;
  margin-bottom: 0;
  background-color: #35aaf9;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const FooterRow = styled.ul`
  list-style: none;
`;

export const FooterItem = styled.li`
  color: white;
  font-size: 2rem;
  margin: 0 0 15px 0;
`;

export const CoolButton = styled.button`
  margin-top: 20px;
  border-style: none;
  width: 200px;
  outline: none;
  font-size: 2rem;
  font-family: 'Cousine';
  padding: 22px 40px;
  color: white;
  background: #35aaf9;
  box-shadow:
  0 2.8px 2.2px rgba(0, 0, 0, 0.034),
  0 6.7px 5.3px rgba(0, 0, 0, 0.048),
  0 12.5px 10px rgba(0, 0, 0, 0.06),
  0 22.3px 17.9px rgba(0, 0, 0, 0.072),
  0 41.8px 33.4px rgba(0, 0, 0, 0.086),
  0 100px 80px rgba(0, 0, 0, 0.12);
  border-radius: 25px;
  cursor: pointer;
  -webkit-transition:0.3s all ease;
  transition:0.3s ease all;
  &:hover {
    background-color:#FFFAFA;
    color: #35aaf9;
  }
`;

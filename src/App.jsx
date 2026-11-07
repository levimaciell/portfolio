import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import terminalIcon from '../assets/terminal.png';
import menuIcon from '../assets/menu.png';
import githubIcon from '../assets/github-logo.png';
import linkedinIcon from '../assets/logotipo-do-linkedin.png';
import instagramIcon from '../assets/instagram.png';
import photo from '../assets/foto_levi.jpg';
import matrixImage from '../assets/screenshot_matrixcrypt.png';
import terminalProjectImage from '../assets/terminalPage.png';
import arrowIcon from '../assets/seta_direita_circulo.png';
import githubWhite from '../assets/github-logo-white.png';
import linkedinWhite from '../assets/linkedin-branc.png';

const socials = (
  <footer className="social-footer">
    <a href="https://www.github.com/levimaciell" target="_blank" rel="noreferrer" aria-label="GitHub"><img src={githubIcon} alt="GitHub" /></a>
    <a href="https://www.linkedin.com/in/levi-maciel" target="_blank" rel="noreferrer" aria-label="LinkedIn"><img src={linkedinIcon} alt="LinkedIn" /></a>
    <a href="https://www.instagram.com/levi_maciell/" target="_blank" rel="noreferrer" aria-label="Instagram"><img src={instagramIcon} alt="Instagram" /></a>
  </footer>
);

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <Link to="/terminal" className="terminal-link" aria-label="Abrir terminal"><img src={terminalIcon} alt="Terminal" /></Link>
      <button className="menu-button" onClick={() => setOpen(value => !value)} aria-expanded={open} aria-label="Abrir menu">
        <img src={menuIcon} alt="" />
      </button>
      <nav className={`main-nav ${open ? 'main-nav--open' : ''}`}>
        <NavLink to="/sobre" onClick={() => setOpen(false)}><span>1.</span> Sobre</NavLink>
        <NavLink to="/projetos" onClick={() => setOpen(false)}><span>2.</span> Projetos</NavLink>
        <a className="resume-link" href="/Curriculo.pdf" target="_blank" rel="noreferrer"><span>3.</span> Currículo</a>
      </nav>
    </header>
  );
}

function PortfolioLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      {socials}
    </>
  );
}

function Home() {
  return <PortfolioLayout><section className="hero">
    <p className="eyebrow">Olá, eu sou</p>
    <h1>Levi Maciel <span className="wave">😎</span></h1>
    <h2>Desenvolvedor fullstack</h2>
    <p className="hero-copy">Atualmente cursando Sistemas de Informação na Universidade Federal da Paraíba. Gosto tanto de frontend quanto de backend e desejo construir uma carreira fullstack com Java, Python, HTML, CSS e JavaScript.</p>
    <Link className="hero-link" to="/projetos">Ver meus projetos <span>→</span></Link>
  </section></PortfolioLayout>;
}

function About() {
  return <PortfolioLayout><section className="about-section">
    <div className="about-copy">
      <p className="eyebrow">Conheça minha história</p>
      <h1>Sobre mim</h1>
      <p>Sempre tive curiosidade sobre tecnologia e decidi ser programador após meu retorno ao Brasil em 2020, depois de um intercâmbio no Canadá.</p>
      <p>Na <strong>Universidade Federal da Paraíba</strong>, cursei Sistemas de Informação e aprofundei conhecimentos em Python, Java, banco de dados e desenvolvimento web. Meu objetivo é me tornar um profissional fullstack.</p>
    </div>
    <div className="about-photo"><img src={photo} alt="Levi Maciel" /></div>
  </section></PortfolioLayout>;
}

const projects = [
  { title: 'MatrixCrypt', description: 'Um site que criptografa e descriptografa mensagens. Foi um desafio proposto pela Alura e Oracle Next Education.', image: matrixImage, github: 'https://github.com/levimaciell/MatrixCrypt', live: 'https://levimaciell.github.io/MatrixCrypt/', techs: ['HTML', 'CSS', 'JavaScript'] },
  { title: 'Portfólio Terminal', description: 'Uma experiência integrada ao portfólio. Ao digitar comandos na tela, o usuário recebe respostas diretamente no terminal.', image: terminalProjectImage, github: 'https://github.com/levimaciell/portfolio', live: '/terminal', techs: ['HTML', 'CSS', 'JavaScript'] },
];

function Projects() {
  return <PortfolioLayout><section className="projects-section">
    <p className="eyebrow">Seleção de trabalhos</p>
    <h1>Meus Projetos</h1>
    <div className="project-grid">
      {projects.map(project => (
        <article className="project-card" key={project.title}>
          <div className="project-image"><img src={project.image} alt={`Prévia do projeto ${project.title}`} /></div>
          <div className="project-content">
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <div className="project-footer">
              <div className="techs">{project.techs.map(tech => <span key={tech}>{tech}</span>)}</div>
              <div className="project-actions">
                <a href={project.github} target="_blank" rel="noreferrer" aria-label={`Código do ${project.title}`}><img src={githubIcon} alt="GitHub" /></a>
                {project.live.startsWith('/') ? <Link to={project.live} aria-label={`Abrir ${project.title}`}><img src={arrowIcon} alt="Abrir" /></Link> : <a href={project.live} target="_blank" rel="noreferrer" aria-label={`Abrir ${project.title}`}><img src={arrowIcon} alt="Abrir" /></a>}
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  </section></PortfolioLayout>;
}

function Terminal() {
  const navigate = useNavigate();
  const [lines, setLines] = useState([]);
  const [command, setCommand] = useState('');
  const [historyVisible, setHistoryVisible] = useState(true);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = event => {
      if (event.ctrlKey && event.key.toLowerCase() === 'l') {
        event.preventDefault();
        setLines([]);
        setHistoryVisible(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const outputFor = value => {
    const parts = value.trim().split(/\s+/);
    const [name, ...args] = parts;
    switch ((name || '').toLowerCase()) {
      case '': return null;
      case 'help': return <><p>Comandos disponíveis:</p><ul><li>smedia → exibe as redes sociais</li><li>exit → voltar para a página inicial</li><li>projects → listar projetos</li><li>whoami → sobre o usuário atual</li><li>reload → recarrega a página</li></ul></>;
      case 'smedia': return <div className="terminal-socials"><a href="https://github.com/levimaciell" target="_blank" rel="noreferrer"><img src={githubWhite} alt="GitHub" /></a><a href="https://linkedin.com/in/levi-maciel" target="_blank" rel="noreferrer"><img src={linkedinWhite} alt="LinkedIn" /></a></div>;
      case 'whoami': return <p>visitor</p>;
      case 'projects': return args.length ? <p>{args[0].toLowerCase() === 'matrixcrypt' ? 'Abrindo MatrixCrypt...' : args[0].toLowerCase() === 'feedapi' ? 'Abrindo FeedAPI...' : `Argumento inválido: ${args[0]}`}</p> : <><p>MatrixCrypt → HTML, CSS e JavaScript</p><p>FeedAPI → Java, Spring Boot e PostgreSQL</p></>;
      case 'exit': navigate('/'); return <p>Voltando para a página inicial...</p>;
      case 'reload': window.location.reload(); return null;
      default: return <p>Comando "{value}" não foi encontrado</p>;
    }
  };

  const submit = event => {
    if (event.key !== 'Enter') return;
    const output = outputFor(command);
    if (command.trim() === 'projects' && command.trim().endsWith('matrixcrypt')) window.open('https://levimaciell.github.io/MatrixCrypt', '_blank');
    setLines(current => [...current, { command, output }]);
    setCommand('');
  };

  return <div className="terminal-page" onClick={() => inputRef.current?.focus()}>
    {historyVisible && <header className="terminal-header">
      <pre>{`  ______                    _             __
 /_  __/__  _________ ___  (_)___  ____ _/ /
  / / / _ \/ ___/ __ \`__ \/ / __ \/ __ \`/ /
 / / /  __/ /  / / / / / / / / / / /_/ / /
/_/  \___/_/  /_/ /_/ /_/_/_/ /_/\__,_/_/`}</pre>
      <p>Clique na tela ou pressione tab para usar o terminal</p>
      <p>Digite help para ver a lista de comandos disponíveis</p>
      <Link className="terminal-back" to="/">← voltar ao portfólio</Link>
    </header>}
    <main className="terminal-output">
      {lines.map((line, index) => <section className="terminal-line" key={index}><p>┌───(visitor@terminal.levi)</p><p><span>└─$</span> {line.command}</p><div className="terminal-result">{line.output}</div></section>)}
      <section className="terminal-line"><p>┌───(visitor@terminal.levi)</p><div className="terminal-input"><span>└─$</span><input ref={inputRef} value={command} onChange={event => setCommand(event.target.value)} onKeyDown={submit} maxLength={130} autoComplete="off" autoFocus /></div></section>
    </main>
  </div>;
}

export default function App() {
  return <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/sobre" element={<About />} />
    <Route path="/projetos" element={<Projects />} />
    <Route path="/terminal" element={<Terminal />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>;
}

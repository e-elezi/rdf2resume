import os,glob,subprocess
import argparse

header = r'''\documentclass[letterpaper,11pt]{article}
\newlength{\outerbordwidth}
\pagestyle{empty}
\raggedbottom
\raggedright
\usepackage[svgnames]{xcolor}
\usepackage{framed}
\usepackage{tocloft}


%-----------------------------------------------------------
%Edit these values as you see fit

\setlength{\outerbordwidth}{3pt}  % Width of border outside of title bars
\definecolor{shadecolor}{gray}{0.75}  % Outer background color of title bars (0 = black, 1 = white)
\definecolor{shadecolorB}{gray}{0.93}  % Inner background color of title bars


%-----------------------------------------------------------
%Margin setup

\setlength{\evensidemargin}{-0.25in}
\setlength{\headheight}{0in}
\setlength{\headsep}{0in}
\setlength{\oddsidemargin}{-0.25in}
\setlength{\paperheight}{11in}
\setlength{\paperwidth}{8.5in}
\setlength{\tabcolsep}{0in}
\setlength{\textheight}{9.5in}
\setlength{\textwidth}{7in}
\setlength{\topmargin}{-0.3in}
\setlength{\topskip}{0in}
\setlength{\voffset}{0.1in}


%-----------------------------------------------------------
%Custom commands
\newcommand{\resitem}[1]{\item #1 \vspace{-2pt}}
\newcommand{\resheading}[1]{\vspace{8pt}
  \parbox{\textwidth}{\setlength{\FrameSep}{\outerbordwidth}
    \begin{shaded}
\setlength{\fboxsep}{0pt}\framebox[\textwidth][l]{\setlength{\fboxsep}{4pt}\fcolorbox{shadecolorB}{shadecolorB}{\textbf{\sffamily{\mbox{~}\makebox[6.762in][l]{\large #1} \vphantom{p\^{E}}}}}}
    \end{shaded}
  }\vspace{-5pt}
}
\newcommand{\ressubheading}[4]{
\begin{tabular*}{6.5in}{l@{\cftdotfill{\cftsecdotsep}\extracolsep{\fill}}r}
		\textbf{#1} & #2 \\
		\textit{#3} & \textit{#4} \\
\end{tabular*}\vspace{-6pt}}
%-----------------------------------------------------------


\begin{document}
'''


footer = r'''\end{document}
'''

def writeJSONtoTEX(data, filename):
    name = "Enkeleda Elezi"
    email = "enkeleda.elezi@gmail.com"
    address = "Hirschberger Str 60 Bonn Germany"

    main = r'''\begin{tabular*}{7in}{l@{\extracolsep{\fill}}r}
    \textbf{\Large '''+ name +r'''} & \textbf{\today} \\
    '''+ email +r''' \\
    '''+ address +r''' \\
    \end{tabular*}
    \\


    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    \resheading{Education}
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    \begin{itemize}

    \item \ressubheading{University Name}{City, Country}{BSc, MSc, PhD, or something else}{2009 - 2013}

    \begin{itemize}
        \resitem{Additional description nr 1}
        \resitem{Additional description nr 2}
    \end{itemize}

    \item \ressubheading{Other University Name}{City, Country}{BSc, MSc, PhD, or something else}{2004 - 2009}

    \end{itemize}


    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    \resheading{Some important section}
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

    \begin{enumerate}
    \item First item
    \item Second item
    \end{enumerate}

    \begin{itemize}
    \item First item
    \item Second item
    \end{itemize}

    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    \resheading{Awards, Grants \& Honours}
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
        \vspace{-2pt}
        \begin{center}\begin{tabular*}{6.6in}{l@{\extracolsep{\fill}}r}
            \multicolumn{2}{c}{Nobel Prize \cftdotfill{\cftdotsep} 2013}\\
            \multicolumn{2}{c}{Big grant \cftdotfill{\cftdotsep} 2010-2013}\\
            \vphantom{E}
    \end{tabular*}
    \end{center}\vspace*{-16pt}
    '''

    content = header + main + footer

    with open(filename,'w') as f:
        f.write(content)

    cmd = ['pdflatex', '-interaction', 'nonstopmode', filename]
    proc = subprocess.Popen(cmd)
    proc.communicate()

    os.unlink('myfile.aux')
    os.unlink('myfile.log')
    os.unlink('myfile.tex')
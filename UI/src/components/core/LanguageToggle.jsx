import React from "react";
import de from "../../images/de.png";
import fr from "../../images/fr.png";
import it from "../../images/it.png";
import en from "../../images/en.png";
import sq from "../../images/sq.png";

export const ListItem = ({ item }) => (
    <React.Fragment>
        <span>
            {item === "de" ? (
                <img src={de} width="20px" height="20px" alt={item}></img>
            ) : (
                    ""
                )}
            {item === "sq" ? (
                <img src={sq} width="20px" height="20px" alt={item}></img>
            ) : (
                    ""
                )}
            {item === "fr" ? (
                <img src={fr} width="20px" height="20px" alt={item}></img>
            ) : (
                    ""
                )}
            {item === "it" ? (
                <img src={it} width="20px" height="20px" alt={item}></img>
            ) : (
                    ""
                )}
            {item === "en" ? (
                <img src={en} width="20px" height="20px" alt={item}></img>
            ) : (
                    ""
                )}{" "}
            <span style={{ textTransform: 'uppercase' }} >{item}</span>
        </span>
    </React.Fragment>
); 

export const languages = ["de", "en", "it", "fr", "sq"];

import React from 'react';
import './Versions.css';
import img7 from '../../assets/images/ComeBack.svg';
import img8 from '../../assets/images/WithoutProof.svg';
import img9 from '../../assets/images/Waiting.svg';
import img10 from '../../assets/images/Proven.svg';
import img11 from '../../assets/images/Invalidated.svg';
import img12 from '../../assets/images/Save.svg';

import { Button } from 'reactstrap';
import { withRouter } from 'react-router';

class Versions extends React.Component {

    state = {
       mapEntries: "",
    }

    home = () => {
        this.props.history.push("/");
    }

    toHashMap = () => {
        const entries = sessionStorage.getItem("entryList");
        const hashMap = new Map(); // mudar por var caso dê errado

        entries.map(entry => {
            if (hashMap.get(entry.group) != undefined) {
                const group = hashMap.get(entry.group); // mudar por var caso dê errado
                group.push(entry);
            } else {
                hashMap.set(entry.group, [entry]); // colchetes - mudar caso dê errado
            }
        
        });

        this.setState({mapEntries: hashMap});
    }

   // nomeAlternativo = () => {

   //     const entriesByGroup = this.state.mapEntries.map(groupOfEntries => {
    //        return (
                
   //         )
    //    })
    

   // }

    
   

    componentDidMount() {
        // Adicionar funções
    }


    render() {

        
        return (
            <div className="Versions01">
                <h1>Danilo de Sousa Costa</h1>
                <h2>(0 Competências)</h2>
                <h3>Primeira Versão do Currículo</h3>
                <h4>Sem Comprovante</h4>
                <h5>Aguardando Validação</h5>
                <h6>Comprovado por Validador</h6>
                <h7>Invalidado</h7>
                <h8>V_12345</h8>
                
                    
                

                <Button onClick={this.home}  color="primary" size="lg" className="ComeBack">
                    <img id="ico-comeBack" className="Button-ComeBack" border="0" src={img7} width="70" height="70" />
                </Button>
                <Button color="primary" size="lg" className="Save">
                    <img id="ico-Save" className="Button-Save" border="0" src={img12} width="40" height="40" />
                </Button>
                <Button color="primary" size="lg" className="Validator-authentication">
                    (+) Auten. Validador
                </Button>
                <Button color="primary" size="lg" className="Electronic-authentication">
                    (+) Auten. Eletrônica
                </Button>
                
    
                
                <div className="boxExperiences">
                    <p> aggdhgdkfgkfdgkjdkafkj</p>
                    <p>khfgehgfiikefh</p>
                    <p>jeufhejiwhfjeigf</p>
                    <p> aggdhgdkfgkfdgkjdkafkj</p>
                    <p>khfgehgfiikefh</p>
                    <p>jeufhejiwhfjeigf</p>
                    <p> aggdhgdkfgkfdgkjdkafkj</p>
                    <p>khfgehgfiikefh</p>
                    <p>jeufhejiwhfjeigf</p>
                    <p> aggdhgdkfgkfdgkjdkafkj</p>
                    <p>khfgehgfiikefh</p>
                    <p>jeufhejiwhfjeigf</p>
                    <p> aggdhgdkfgkfdgkjdkafkj</p>
                    <p>khfgehgfiikefh</p>
                    <p>jeufhejiwhfjeigf</p>
                    <p> aggdhgdkfgkfdgkjdkafkj</p>
                    <p>khfgehgfiikefh</p>
                    <p>jeufhejiwhfjeigf</p>
                   
                   
                    


                </div>
                
                <img id="ico-WithoutProof" className="Button-WithoutProof" border="0" src={img8} width="40" height="40" />
                <img id="ico-Waiting" className="Button-Waiting" border="0" src={img9} width="40" height="40" />
                <img id="ico-Proven" className="Button-Proven" border="0" src={img10} width="40" height="40" />
                <img id="ico-Invalidated" className="Button-Invalidated" border="0" src={img11} width="30" height="30" />
                
            </div>

               

                
               

        )
    }

}

export default withRouter(Versions);
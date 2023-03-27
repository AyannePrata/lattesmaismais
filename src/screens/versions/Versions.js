import React from 'react';
import './Versions.css';

import { Button } from 'reactstrap';
import { withRouter } from 'react-router';

class Versions extends React.Component {

    home = () => {
        this.props.history.push("/");
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
                    
                </Button>
                <Button color="primary" size="lg" className="Save">
                    
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
                
                
                
            </div>

               

                
               

        )
    }

}

export default withRouter(Versions);
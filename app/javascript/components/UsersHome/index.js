import React from 'react';
import PropTypes from 'prop-types';
// import LoadingIndicator from '../common/LoadingIndicator'

export default function UsersHome() {

  return (
    <div className="max-w-screen-lg container mx-auto grid grid-cols-5 gap-4">
      <div className="col-span-1">
        <ul>
          <li><span className="flex text-xl font-bold mb-5"><a href="button" className="btn btn-blue">Crear curso</a></span></li>
          <li><a className="flex text-xl font-bold leading-10 mb-2" href="#">📝 Bitácora</a></li>
          <li><a className="flex text-xl font-bold leading-10 mb-2" href="#">🎓 Mis cursos</a></li>
        </ul>
      </div>
      <div className="col-span-4">
        <ul>
          <li className="flex border-solid border border-gray-400 rounded-xlg p-6">
            <div>
              <h3 className="text-2xl font-bold mb-1">Curso de matemática - Derivadas e Integrales</h3>
              <div className="mb-2">3 julio 2020 - 10 octubre 2020</div>
              <p className="mb-3">To control the font size of an element at a specific breakpoint, add a  prefix to any existing font size utility. For example, use md:text-lg to apply the text-lg utility at only medium screen sizes and above.</p>
              <div>💵 $10000</div>
            </div>
            <img src="https://pbs.twimg.com/ad_img/1305151499081785345/Zd9bXo-Q?format=jpg&name=900x900" alt="" style={{width: '180px'}} className="ml-4" />
          </li>
        </ul>
      </div>
    </div>
  );
}

UsersHome.propTypes = {
  
};

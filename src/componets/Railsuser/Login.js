import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {

	const navigate = useNavigate();

	// バリデーションのフォームを定義
	const { register, handleSubmit, watch, formState: { errors } } = useForm();

	// ログインフォームの送信ボタン押下時に実行
	const onSubmit = (data) => {

		// ログインURIを設定（ホスト名は .env ファイルからインポート）
		const loginPath = process.env.REACT_APP_API_HOST + '/login';

		// パラメータ設定
		var params = new URLSearchParams();
		params.append('userName', data.userName);
		params.append('password', data.password);
		
		// ログイン API へ POST
		axios.post(loginPath , params)
			.then((response)=>{

				// 認可情報を SessionStorage に設定
				sessionStorage.setItem('AUTHORITY', response.headers.authority);

				// /main にリダイレクト
				navigate('/main')
			})
  }

	return(
		<>
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className='input-area'>
				<p className='event-title'>アカウント名</p>
					<input type='text' {...register("userName", {required: true})} />
				<p>{errors.userName?.type === 'required' && "アカウント名を入力してください。"}</p>
			</div>
			<div className='input-area'>
				<p className='event-title'>パスワード</p>
					<input type='password' {...register("password", {required: true})} />
				<p>{errors.password?.type === 'required' && "パスワードを入力してください。"}</p>
			</div>
			<input type="submit" value='ログイン' />
		</form>

		<Link to='/signup'>新規会員登録はこちら</Link>
			
		</>
	)
}

export default Login;


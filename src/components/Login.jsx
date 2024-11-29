import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Login = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            terms: false,
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Geçerli bir e-posta adresi girin.')
                .required('E-posta adresi gereklidir.'),
            password: Yup.string()
                .min(8, 'Şifre en az 8 karakter olmalıdır.')
                .matches(/[A-Z]/, 'Şifre en az bir büyük harf içermelidir.')
                .matches(/[0-9]/, 'Şifre en az bir rakam içermelidir.')
                .required('Şifre gereklidir.'),
            terms: Yup.boolean()
                .oneOf([true], 'Şartları kabul etmelisiniz.'),
        }),
        onSubmit: (values) => {
            window.location.href = '/success';
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label htmlFor="email">E-posta</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} // Buraya ekledik
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                ) : null}
            </div>
            <div>
                <label htmlFor="password">Şifre</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} // Buraya ekledik
                    value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                ) : null}
            </div>
            <div>
                <label>
                    <input
                        type="checkbox"
                        name="terms"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} // Buraya ekledik
                        checked={formik.values.terms}
                    />
                    Şartları kabul ediyorum
                </label>
                {formik.touched.terms && formik.errors.terms ? (
                    <div>{formik.errors.terms}</div>
                ) : null}
            </div>
            <button type="submit" disabled={!formik.isValid || !formik.dirty}>
                Giriş Yap
            </button>
        </form>
    );
};

export default Login;
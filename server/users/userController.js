// const { userService, checkIdAvailability, loginService } = require('../users/userService');
//
// const signUp = async (req, res) => {
//     const { id, password, email, name, nickname, phone, socialId } = req.body;
//     // console.log(req.body);
//     try {
//         const result = await userService(id, password, email, name, nickname, phone, socialId);
//         res.status(201).json({ message: '회원가입 성공', data: result });
//     } catch (error) {
//         console.error('회원가입 실패 (Controller):', error); // 서버 콘솔에 자세한 에러 로그
//         res.status(400).json({ message: error.message });
//     }
// };
//
// const checkId = async (req, res) => {
//     const { id } = req.query;
//     console.log('id : ' + id);
//
//     if (!id) {
//         return res.status(400).json({ message: '아이디를 입력해주세요.' });
//     }
//
//     try {
//         const isIdTaken = await checkIdAvailability(id);
//         res.json({ available: !isIdTaken });
//     } catch (error) {
//         console.error('아이디 중복 오류 (Controller): ', error);
//         res.status(500).json({ message: '서버 오류 발생' });
//     }
// }
//
// const login = async (req, res) => {
//     const { id, password } = req.body;
//     try {
//         const result = await loginService(id, password);
//
//         if (result.success) {
//             req.session.user = {
//                 inform: result.inform,
//                 provider: 'local',
//             };
//             req.session.isLoggedIn = true;
//             return res.status(200).json({ message: '로그인 성공', user: req.session.user, success: true });
//         } else {
//             return res.status(401).json({ message: result.message, success: false });
//         }
//
//     } catch (error) {
//         console.error('로그인 실패 (Controller):', error); // 서버 콘솔에 자세한 에러 로그
//         res.status(400).json({ message: error.message, success: false });
//     }
// }
// const logout = async (req, res) => {
//     if (req.session.user && req.session.user.provider == 'kakao') {
//         const accessToken = req.session.user.kakaoAccessToken;
//
//         if(!accessToken) {
//             return res.status(400).json({message: '카카오 엑세스 토큰이 없습니다.'});
//         }
//
//         try {
//             const response = await fetch('https://kapi.kakao.com/v1/user/logout', {
//                 method: 'post',
//                 headers: {
//                     'Authorization' : `Bearer ${accessToken}`,
//                 },
//             });
//
//             if(!response.ok) {
//                 const errorData = await response.json();
//                 console.error('카카오 로그아웃 api 호출 실패:', errorData);
//                 return res.status(response.status).json({message: '카카오 로그아웃 실패', error: errorData});
//             }
//
//             const data = await response.json();
//             console.log('카카오 로그아웃 응답:', data);
//
//             req.session.destroy((err) => {
//                 if(err) {
//                     console.error('세션 삭제 오류:', err);
//                     return res.status(500).json({message:'로그아웃 실패'});
//                 } else {
//                     res.clearCookie('connect.sid');
//                     res.json({message: '로그아웃 성공'});
//                 }
//             });
//         } catch(error) {
//             console.error('카카오 로그가웃 api 호출 오류', error);
//             res.status(500).json({ message: '카카오 로그아웃 실패', error: error.message });
//         }
//     } else {
//         req.session.destroy((err) => {
//             if (err) {
//                 console.error('세션 삭제 실패', err);
//                 return res.status(500).json({ message: '로그아웃 실패' });
//             } else {
//                 res.clearCookie('connect.sid'); // 세션 쿠키 이름에 따라 변경
//                 res.status(200).json({ message: '로그아웃 성공' });
//             }
//         })
//     }
// }
//
// module.exports = { signUp, checkId, login, logout };

const { userService, checkIdAvailability, loginService } = require('../users/userService');

const signUp = async (req, res) => {
    const { id, password, email, name, nickname, phone, socialId } = req.body;
    try {
        const result = await userService(id, password, email, name, nickname, phone, socialId);
        res.status(201).json({ message: '회원가입 성공', data: result });
    } catch (error) {
        console.error('회원가입 실패 (Controller):', error);
        res.status(400).json({ message: error.message });
    }
};

const checkId = async (req, res) => {
    const { id } = req.query;
    console.log('id : ' + id);

    if (!id) {
        return res.status(400).json({ message: '아이디를 입력해주세요.' });
    }

    try {
        const isIdTaken = await checkIdAvailability(id);
        res.json({ available: !isIdTaken });
    } catch (error) {
        console.error('아이디 중복 오류 (Controller): ', error);
        res.status(500).json({ message: '서버 오류 발생' });
    }
}

const login = async (req, res) => {
    const { id, password } = req.body;
    try {
        const result = await loginService(id, password);

        if (result.success) {
            req.session.user = {
                inform: {
                    userNo: result.inform.USER_NO, // Oracle 컬럼명에 맞춰 대문자 사용
                    id: result.inform.ID,
                    email: result.inform.EMAIL,
                    nickname: result.inform.NICKNAME,
                    phone: result.inform.PHONE,
                    name: result.inform.NAME,
                    socialId: result.inform.SOCIAL_ID,
                    profileImage: result.inform.PROFILE_IMAGE // 추가된 필드
                },
                provider: 'local',
            };
            req.session.isLoggedIn = true;
            return res.status(200).json({ message: '로그인 성공', user: req.session.user, success: true });
        } else {
            return res.status(401).json({ message: result.message, success: false });
        }

    } catch (error) {
        console.error('로그인 실패 (Controller):', error);
        res.status(400).json({ message: error.message, success: false });
    }
}
const logout = async (req, res) => {
    if (req.session.user && req.session.user.provider == 'kakao') {
        const accessToken = req.session.user.kakaoAccessToken;

        if(!accessToken) {
            return res.status(400).json({message: '카카오 엑세스 토큰이 없습니다.'});
        }

        try {
            const response = await fetch('https://kapi.kakao.com/v1/user/logout', {
                method: 'post',
                headers: {
                    'Authorization' : `Bearer ${accessToken}`,
                },
            });

            if(!response.ok) {
                const errorData = await response.json();
                console.error('카카오 로그아웃 api 호출 실패:', errorData);
                return res.status(response.status).json({message: '카카오 로그아웃 실패', error: errorData});
            }

            const data = await response.json();
            console.log('카카오 로그아웃 응답:', data);

            req.session.destroy((err) => {
                if(err) {
                    console.error('세션 삭제 오류:', err);
                    return res.status(500).json({message:'로그아웃 실패'});
                } else {
                    res.clearCookie('connect.sid');
                    res.json({message: '로그아웃 성공'});
                }
            });
        } catch(error) {
            console.error('카카오 로그아웃 api 호출 오류', error);
            res.status(500).json({ message: '카카오 로그아웃 실패', error: error.message });
        }
    } else {
        req.session.destroy((err) => {
            if (err) {
                console.error('세션 삭제 실패', err);
                return res.status(500).json({ message: '로그아웃 실패' });
            } else {
                res.clearCookie('connect.sid'); // 세션 쿠키 이름에 따라 변경
                res.status(200).json({ message: '로그아웃 성공' });
            }
        })
    }
}

module.exports = { signUp, checkId, login, logout };
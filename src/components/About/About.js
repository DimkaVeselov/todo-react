import React from 'react';
import {Octokit} from '@octokit/rest';

import styles from './About.module.css';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import TelegramIcon from '@material-ui/icons/Telegram';
import LinearProgress from '@material-ui/core/LinearProgress';
import Card from '@material-ui/core/Card';

import errorImg from './img/error.svg'

const octokit = new Octokit();

class About extends React.Component {
  state = {
    isLoading: true,
    isError: false,
    error: '',
    repoList: [],
    userName: 'DimkaVeselov',
    User: [],
    firstRepo: 0,
    lastRepo: 2
  }

  componentDidMount() {
    octokit.repos.listForUser({
      username: this.state.userName
    }).then (({ data }) => {
      this.setState({
        repoList: data,
        isLoading: false,
        isError: false
      });
    }).catch ((err) => {
        this.setState({
          isError: true,
          isLoading: false,
          error: 'УПС, что-то пошлоне так: ' + err.name + ' ' + err.message
        });
      });

      octokit.users.getByUsername({
        username: this.state.userName
      }).then (({data}) => {
        this.setState({
          User: data
        })
      }).catch ((err) => {console.log(err)})
  }

    onClickNext = () => {
      this.setState({
        firstRepo: this.state.firstRepo + 2,
        lastRepo: this.state.lastRepo + 2
      })
    };

    onClickBack = () => {
      this.setState({
        firstRepo: this.state.firstRepo - 2,
        lastRepo: this.state.lastRepo - 2
      })
    };

  render() {
    
    const { isLoading, isError, repoList, User, firstRepo, lastRepo } = this.state;

    return (
      <div>
        { isLoading ? <LinearProgress /> : isError ? 
          <Card className={styles.repoCard + ' ' + styles.errorCard}>
            <div className={styles.errorWrap}>
              <img src={errorImg} alt='УПС, что-то пошлоне так' className={styles.errorImg}></img>.
              <h2 className={styles.errorTitle}>УПС, что-то пошло не так...</h2>
              <p className={styles.errorText}>попробуйте <a href='.' className={styles.errorRefresh}>загрузить</a>еще раз</p>
            </div>
          </Card> :

          <div className={styles.wrap}>
            <Card className={styles.userCard}>
              <CardMedia
                className={styles.userAvatar}
                image={User.avatar_url}
                title='User Avatar'
                alt='user avatar'
              >
              </CardMedia>
              <CardContent className={styles.userInfo}>
                <div className={styles.userInfoWrap}>
                  <Typography  variant='h6' component='h2' color='primary' className={styles.userInfoTitle}>
                    {User.name}
                  </Typography>
                    <Typography variant='body2' component='p' color='textSecondary' className={styles.userBio}>
                    {User.bio}
                  </Typography>
                  <Link href='mailto: dv.privezencev@mail.ru' color='textSecondary' underline='none' className={styles.emailLink}>
                    <AlternateEmailIcon fontSize='small' className={styles.emailImg} />
                    dv.privezencev@mail.ru
                  </Link>
                  <Link href='tg: //resolvedomain=Ghostman88' color='textSecondary' underline='none' className={styles.telegramLink}>
                    <TelegramIcon fontSize='small' className={styles.telegramImg} />
                    +7 916 087 55 96
                  </Link>
                </div>
                <div className={styles.socialNetwork}>
                  <Link href={User.html_url} color='textSecondary' underline='none' className={styles.socialNetworkLink}>
                    <ion-icon name='logo-github' className={styles.socialNetworkLogo}></ion-icon>
                  </Link>
                  <Link href='https://www.linkedin.com/in/dmitry-privezentcev/' color='textSecondary' underline='none' className={styles.socialNetworkLink}>
                      <ion-icon name='logo-linkedin' className={styles.socialNetworkLogo}></ion-icon>
                  </Link>
                  <Link href='https://www.instagram.com/veselov_dimka/' color='textSecondary' underline='none' className={styles.socialNetworkLink}>
                    <ion-icon name='logo-instagram' className={styles.socialNetworkLogo}></ion-icon>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className={styles.repoCard}>
              <CardContent className={styles.repoWrap}>
                <Typography variant='h6' component='h2' className={styles.repoTitle}>
                  мои репозитории:
                </Typography>
                {repoList.length > 0 && <ul className={styles.repoList}>
                  {repoList.slice(firstRepo, lastRepo).map(repo => (
                    <Link href={repo.html_url} key={repo.id} color='inherit' underline='none' className={styles.repoLink}>
                      <li className={styles.repository}>
                        <p className={styles.repoName}> {repo.name} </p>
                        <div className={styles.repoInfo}>
                          <div className={styles.repoLanguage}>
                            <div className={styles[`repoLanguage_${repo.language}`.toLowerCase()] + ' ' + styles.repoLanguageIcon}></div>
                            <p className={styles.repoText}> {repo.language} </p>
                          </div>
                          <div className={styles.repoStar}>
                            <ion-icon name="star" class={styles.repoStarIcon}></ion-icon>
                            <p className={styles.repoText}>{repo.stargazers_count}</p>
                          </div>
                          <div className={styles.repoForks}>
                            <ion-icon name="git-network-outline" class={styles.repoForksIcon}></ion-icon>
                            <p className={styles.repoText}>{repo.forks}</p>
                          </div>
                          <p className={styles.repoText}>Обновлен {new Date(repo.updated_at).toLocaleString('ru', { day:'numeric', month:'long', year:'numeric'})}</p>
                        </div>
                      </li>
                    </Link>))}
                </ul>}

                {repoList.length === 0 && <div className={styles.repoError}>
                  <img src={errorImg} alt='нет репозиториев' className={styles.repoErrorImg}/>
                  <h2 className={styles.repoErrorTitle}>репозитории отсутствуют</h2>
                  <p className={styles.repoErrorText}>Добавьте минимум один репозиторий на <a href='https://github.com' className={styles.repoErrorLink}> github.com </a> </p>
                </div>
                }
              </CardContent>

              {repoList.length > 0 && <CardActions className={styles.buttonWrap}>
                <Button className={styles.button} variant="outlined" color="primary" disabled={firstRepo ===0} onClick={() => this.onClickBack()}>Назад</Button>
                <Button className={styles.button} variant="outlined" color="primary" disabled={repoList.length - lastRepo <= 0} onClick={() => this.onClickNext()}>Далее</Button>
              </CardActions>
            }
            </Card>
            
          </div>
       }
      </div>
    )
  }
}

export default About;
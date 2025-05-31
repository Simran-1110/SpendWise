"use client"
import React, { useState } from 'react'
import './style.css'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'


function Hero() {
    const {user, isSignedIn} = useUser();
    let [faq1, setFaq1] = useState(false);
    let [faq2, setFaq2] = useState(false);
    let [faq3, setFaq3] = useState(false);
    let [faq4, setFaq4] = useState(false);
    let [faq5, setFaq5] = useState(false);
  return (
    <>
    <div className="top">
                <div className="up">
                    <div className="topContent">
                        <p id="tagline">Track expenses, set budgets, and achieve your financial goals.</p>
                        <p>Take control of your finances with App name.</p>
                    </div>
                    <div className="topImg">
                        <img src="/interest.png" alt="Interest loan calculator"/>
                    </div>
                </div>
                <div className="down">
                    <p> { isSignedIn? 
                            <Link href={'/dashboard'}>
                            Go To Dashboard  ➟
                            </Link>
                            : 
                            <Link href={'/sign-in'}>
                            Get Started  ➟
                            </Link>
                        }
                        
                    </p>
                </div>
            </div>
        
        <div className='financeInfo'>
            <div className="finances">
                <div className="financeHead">
                    <p>Track your finances with ease</p>
                </div>
                <div className="financeBox">
                    <div className="finItem">
                        <div className="dot">
                            <img src="/Ellipse.png" alt=""/>
                        </div>
                        <div className="finText">
                            <div className="finHead">Budgeting</div>
                            <div className="finContent">
                                Set and Manage budgets for different categories.
                            </div>
                        </div>
                    </div>
                    <div className="finItem">
                        <div className="dot">
                            <img src="/Ellipse.png" alt=""/>
                        </div>
                        <div className="finText">
                            <div className="finHead">Saving Goals</div>
                            <div className="finContent">
                                Set and track savings goals for specific purposes.
                            </div>
                        </div>
                    </div>
                    <div className="finItem">
                        <div className="dot">
                            <img src="/Ellipse.png" alt=""/>
                        </div>
                        <div className="finText">
                            <div className="finHead">Income Tracking</div>
                            <div className="finContent">
                                Record your income sources and amounts.
                            </div>
                        </div>
                    </div>
                    <div className="finItem">
                        <div className="dot">
                            <img src="/Ellipse.png" alt=""/>
                        </div>
                        <div className="finText">
                            <div className="finHead">Financial Reports</div>
                            <div className="finContent">
                                Generate detailed reports on your spendings, and income.
                            </div>
                        </div>
                    </div>
                    <div className="finItem">
                        <div className="dot">
                            <img src="/Ellipse.png" alt=""/>
                        </div>
                        <div className="finText">
                            <div className="finHead">Expense Tracking</div>
                            <div className="finContent">
                                Log expenses automatially or manually.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>

            <div className="benefits">
                <div className="benefitsHead">
                    <p>Benefits for Different User Groups</p>
                </div>
                <div className="benefitBox">
                    <div className="benefitItem">
                        <div className="benefitTopic">Students</div>
                        <div className="benefitContent">
                            <p>Our personal finance tracker is designed to help students manage their money effectively. You can easily track your tuition payments create budgets for living expenses, and save for future goals.</p>
                        </div>
                    </div>
                    <div className="benefitItem">
                        <div className="benefitTopic">Working professionals</div>
                        <div className="benefitContent">
                            <p>As a working professional, our app can help you take control of your finances. Track your income and expenses, set savings goals, and manage your debt.</p>
                        </div>
                    </div>
                    <div className="benefitItem">
                        <div className="benefitTopic">Families</div>
                        <div className="benefitContent">
                            <p>Families can use our app to streamline their finances. Create household budgets, track shared expenses, and plan for future financial needs.</p>
                        </div>
                    </div>
                </div>
            </div>
        <footer>
            <div className="faqs">
                <div className="faqsHead">
                    Frequently asked questions
                </div>
                <div className="faqsBox">
                    <ul>
                        <li onClick={() => (
                            faq1 = !faq1,
                            setFaq1(faq1)
                        )}> 
                            { !faq1 ? (<p>Is my data secure?</p>) :
                            (<p>Yes, we prioritize data security by using robust encryption and privacy measures to protect your financial information.</p>
                            )}
                        </li>
                        <li onClick={() => (
                            faq2 = !faq2,
                            setFaq2(faq2)
                        )}>
                            { !faq2? 
                            <p>Can I connect my bank accounts?</p>:
                            <p>Absolutely! You can securely connect your bank accounts to easily track your transactions and manage your finances.</p>
                            }
                        </li>
                        <li onClick={() => (
                            faq3 = !faq3,
                            setFaq3(faq3)
                        )}>
                            { !faq3? 
                            <p>How often should I review my budget?</p> :
                            <p>It's recommended to review your budget at least once a week to stay on top of your spending and adjust as needed.</p>
                            }
                        </li>
                        <li onClick={() => (
                            faq4 = !faq4,
                            setFaq4(faq4)
                        )}>
                            {!faq4? <p>Can I share my data with others?</p>
                            : <p>Yes, you can share your financial insights and reports with trusted individuals or family members for collaborative planning.</p>
                            }
                        </li>
                        <li onClick={() => (
                            faq5 = !faq5,
                            setFaq5(faq5)
                        )}>
                            {!faq5? <p>Is there a fee for using the app?</p>:
                            <p>The basic version of our app is free, with optional premium features available for a small subscription fee.</p>
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    </>
  )
}

export default Hero
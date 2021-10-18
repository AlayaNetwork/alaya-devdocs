module.exports = {
    docs: [
        'Overview',
        'Glossary',

        {
            type: 'category',
            label: 'Basics',
            items: [
                'Intro_to_Alaya',
                'Intro_to_ATP',
                'staking_and_delegation',
                'Networks',
                'Alaya_Account'
            ]
        },
        {
            type: 'category',
            label: 'Advanced',
            items: ['Architecture', 'Economic_model', 'Consensus_mechanism', 'Governance_mechanism']
        },
        {
            type: 'category',
            label: 'Alaya Node',
            items: [
                'Intro_to_validator',
                'Run_a_fullnode',
                'Become_Validator',
                'Data_snapshot',
                {
                    type: 'category',
                    label: 'Tools for nodes',
                    items: ['Online_MTool', 'Offline_MTool', 'Command_Line_Tools']
                }
            ]
        },
        {
            type: 'category',
            label: 'Developers',
            items: [
                'Development_guide',
                {
                    type: 'category',
                    label: 'Set up local environment',
                    items: ['Join_the_dev_network', 'Run_a_dev_node', 'Private_network']
                },
                {
                    type: 'category',
                    label: 'Dev Tools',
                    items: ['Alaya-Truffle', 'IDE']
                },
                {
                    type: 'category',
                    label: 'Smart contract',
                    items: [{
                            type: 'category',
                            label: 'Solidity contract',
                            items: [
                                'Solidity_Getting_started',
                                'Solidity_Migration_tutorial',
                                'Solidity_Development_costs',
                                'Solidity_Best_practices',
                                'Solidity_Contract_security'
                            ]
                        },
                        {
                            type: 'category',
                            label: 'Wasm contract',
                            items: ['Wasm_Getting_started', 'Wasm_Development_costs', 'Wasm_Best_practices', 'Wasm_API']
                        },
                    ]
                },
                {
                    type: 'category',
                    label: 'References',
                    items: ['JS_SDK', 'Java_SDK', 'Python_SDK', 'Go_SDK', 'Json_Rpc', 'Explorer_API', 'Samurai_API']
                },
                {
                    type: 'category',
                    label: 'ARC Token',
                    items: ['ARC20', 'ARC721']
                },
            ]
        },
        {
            type: 'category',
            label: 'Tutorials',
            items: ['JS-Tutorials',  'DApp_migrate']
        },

        {
            type: 'category',
            label: 'Data and analytics',
            items: ['AlayScan', 'PlatEye']
        },
        {
            type: 'category',
            label: 'Wallet',
            items: ['Wallet_Guide', 'ATON_user_manual', 'Samurai_user_manual']
        },
        {
            type: 'category',
            label: 'Community',
            items: ['Join_the_Community', 'Ecosystem_Programs', 'Ways_to_contribute', 'Contribution_Guidelines']
        }
    ]
}

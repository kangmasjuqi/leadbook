<?php
namespace Deployer;

require 'recipe/laravel.php';

// Project name
set('application', 'leadbook');

// Project repository
set('repository', 'https://github.com/kangmasjuqi/leadbook');

// Shared files/dirs between deploys 
add('shared_files', []);
add('shared_dirs', []);

// Writable dirs by web server 
add('writable_dirs', []);

// Keep releases 
set('keep_releases', 3);

// Hosts
host('127.0.0.1')
    ->set('branch', 'develop')
    ->set('deploy_path', '/var/www/html/develop'); 

// host('leadbook_production.com')
//     ->set('branch', 'production')
//     ->set('deploy_path', '/var/www/html/production'); 
//     ->user('leadbook_user')
//     ->port(22)
//     ->configFile('~/.ssh/config')
//     ->identityFile('~/.ssh/id_rsa')
//     ->forwardAgent(true)
//     ->multiplexing(true)
//     ->addSshOption('UserKnownHostsFile', '/dev/null')
//     ->addSshOption('StrictHostKeyChecking', 'no');


// Tasks
desc('Deploy Leadbook project');
    task('deploy', [
        'deploy:info',
        'deploy:prepare',
        'deploy:lock',
        'deploy:release',
        'deploy:update_code',
        'deploy:shared',
        'deploy:writable',
        'deploy:vendors',
        'deploy:clear_paths',
        'deploy:symlink',
        'deploy:unlock',
        'cleanup',
        'success'
    ]);

// [Optional] if deploy fails automatically unlock.
after('deploy:failed', 'deploy:unlock');

// Migrate database before symlink new release.
before('deploy:symlink', 'artisan:migrate');

